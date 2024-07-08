import fetch from "node-fetch";
import { apiKey, baseCoinGeckoUrl } from "./common";

export async function health() {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "OK" }),
  };
}

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

    return {
      statusCode: 200,
      body: JSON.stringify({ results: json }),
    };
  } catch (err) {
    console.error("error:" + err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err }),
    };
  }
}

export async function history(event) {
  const { name } = event.queryStringParameters;

  return {
    statusCode: 200,
    body: JSON.stringify({ name }),
  };
}
