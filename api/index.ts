import fetch from "node-fetch";
import { baseCoinGeckoUrl } from "./common";

export async function health() {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "OK" }),
  };
}

export async function search(event) {
  const { name } = event.queryStringParameters;

  return {
    statusCode: 200,
    body: JSON.stringify({ name }),
  };
}

export async function history(event) {
  const { name } = event.queryStringParameters;

  return {
    statusCode: 200,
    body: JSON.stringify({ name }),
  };
}
