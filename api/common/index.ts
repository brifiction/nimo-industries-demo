import { Resource } from "sst";

export const baseCoinGeckoUrl = "https://api.coingecko.com/api/v3";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": Resource.ApiKey.value ?? process.env.API_KEY!,
  },
};
