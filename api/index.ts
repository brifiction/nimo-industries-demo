import fetch from "node-fetch";
import { baseCoinGeckoUrl, options } from "./common";
import { db } from "../drizzle";
import { searchHistoryTable, usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { APIGatewayEvent } from "aws-lambda";
import { sendMail } from "./mail";

/**
 * Search for cryptocurrency, by cryptocurrency name.
 *
 */
export async function search(event: APIGatewayEvent) {
  try {
    const queryParams = event.queryStringParameters;
    const headers = event.headers;

    if (!headers || !("x-api-token" in headers)) {
      throw new Error("No API token provided");
    }

    if (!queryParams || !queryParams.query) {
      throw new Error("No query parameter provided");
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.token, headers["x-api-token"]));

    if (!user.length) {
      throw new Error("Invalid token");
    }

    const url = `${baseCoinGeckoUrl}/simple/price?ids=${
      queryParams.query
    }&vs_currencies=${queryParams.currency ?? "usd,aud"}`;

    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("Failed to fetch data from CoinGecko");
    }
    const json = await res.json();

    const results = await db
      .insert(searchHistoryTable)
      .values({
        userId: headers["x-api-token"],
        searchQuery: queryParams.query,
        searchResults: JSON.stringify(json, null, 2),
      })
      .returning({
        id: searchHistoryTable.id,
      });

    await sendMail(
      "crypto-user@test.com",
      "Receipt - Your crypto search results",
      JSON.stringify({ results, json }, null, 2)
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ results: json }),
    };
  } catch (err) {
    console.error("Error:", err.message);
    let statusCode = 500;
    let message = "There is an error, please ensure you're authorized.";

    if (err.message === "No API token provided") {
      statusCode = 401;
      message = err.message;
    } else if (err.message === "Invalid token") {
      statusCode = 401;
      message = err.message;
    } else if (err.message === "No query parameter provided") {
      statusCode = 400;
      message = err.message;
    } else if (err.message === "Failed to fetch data from CoinGecko") {
      statusCode = 502;
      message = err.message;
    }

    return {
      statusCode,
      body: JSON.stringify({
        error: statusCode,
        message,
      }),
    };
  }
}

/**
 * List search history of API user, by provided UUID.
 *
 */
export async function history(event: APIGatewayEvent) {
  try {
    const headers = event.headers;

    if (!headers || !("x-api-token" in headers)) {
      throw new Error("No API token provided");
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.token, headers["x-api-token"] || ""));

    if (user.length === 0) {
      throw new Error("Invalid token");
    }

    const searchHistoryResults = await db
      .select()
      .from(searchHistoryTable)
      .where(eq(searchHistoryTable.userId, headers["x-api-token"] || "")); // Assuming user[0].id is the userId you need

    return {
      statusCode: 200,
      body: JSON.stringify({
        count: searchHistoryResults.length,
        results: searchHistoryResults,
      }),
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 401,
        message:
          err.message || "There is an error, please ensure you're authorized.",
      }),
    };
  }
}
