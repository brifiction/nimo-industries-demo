// import { Resource } from "sst";
import fetch from "node-fetch";
import { apiKey, baseCoinGeckoUrl } from "./common";
import { db } from "../drizzle";
import { searchHistoryTable } from "../db/schema";

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
 * Search for cryptocurrency, by cryptocurrency name.
 *
 * @returns
 */
export async function search(event) {
  try {
    const { query } = event.queryStringParameters;

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

export async function history(event) {
  const { query } = event.queryStringParameters;

  const searchHistoryResults = await db.select().from(searchHistoryTable);

  return {
    statusCode: 200,
    body: JSON.stringify({ searchHistoryResults }),
  };
}
