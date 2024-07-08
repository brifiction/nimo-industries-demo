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
  },
});
