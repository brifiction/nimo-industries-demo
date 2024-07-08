/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "nimo-industries-demo",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const table = new sst.aws.Dynamo("NimoCryptocurrencySearchHistory", {
      fields: {
        id: "string",
        crypto: "string",
        createdAt: "string",
      },
      primaryIndex: {
        hashKey: "id",
        rangeKey: "createdAt",
      },
      globalIndexes: {
        cryptoIndex: {
          hashKey: "crypto",
          rangeKey: "createdAt",
        },
      },
      stream: "new-and-old-images",
    });

    const api = new sst.aws.ApiGatewayV2("NimoCryptocurrencyApi");
    api.route("GET /", {
      handler: "api/index.health",
    });
    api.route("GET /search", {
      handler: "api/index.search",
    });
    api.route("GET /history", {
      handler: "api/index.history",
    });

    return {
      api: api.url,
      table: table.name,
    };
  },
});
