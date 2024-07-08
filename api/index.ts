// import { Resource } from "sst";
import fetch from "node-fetch";
import { apiKey, baseCoinGeckoUrl } from "./common";
import { db } from "../drizzle";
import { searchHistoryTable, usersTable } from "../db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { APIGatewayEvent } from "aws-lambda";

/**
 * Check API service health.
 *
 * @returns
 */
export async function health() {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "OK" }),
  };
}

/**
 * Generate a unique token for API user.
 *
 */
export async function createUser() {
  try {
    const results = await db
      .insert(usersTable)
      .values({ token: uuidv4() })
      .returning({
        id: usersTable.id,
      });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Save the token! It will not be shown again.",
        results,
      }),
    };
  } catch (err) {
    console.error("error:" + err);
  }
}

/**
 * Search for cryptocurrency, by cryptocurrency name.
 *
 */
export async function search(event: APIGatewayEvent) {
  try {
    const { query } = event.queryStringParameters;
    const headers = event.headers;

    if ("x-api-token" in headers) {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.token, headers["x-api-token"] || ""));

      if (!user) {
        throw new Error("Invalid token");
      }
    } else {
      throw new Error("No API token provided");
    }

    const url = `${baseCoinGeckoUrl}/search?query=${query}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": apiKey,
      },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    await db.insert(searchHistoryTable).values({
      userId: headers["x-api-token"],
      searchQuery: query,
      searchResults: JSON.stringify(json),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ results: json }),
    };
  } catch (err) {
    console.error("error:" + err);
  }
}

/**
 * List search history of API user, by provided UUID.
 *
 */
export async function history(event: APIGatewayEvent) {
  const headers = event.headers;

  if ("x-api-token" in headers) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.token, headers["x-api-token"] || ""));

    if (!user) {
      throw new Error("Invalid token");
    }
  } else {
    throw new Error("No API token provided");
  }

  const searchHistoryResults = await db
    .select()
    .from(searchHistoryTable)
    .where(eq(searchHistoryTable.userId, headers["x-api-token"] || ""));

  return {
    statusCode: 200,
    body: JSON.stringify({
      count: searchHistoryResults.length,
      results: searchHistoryResults,
    }),
  };
}
