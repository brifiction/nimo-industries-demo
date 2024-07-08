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
    const secret = new sst.Secret("DbUrl", "connection-string");

    const api = new sst.aws.ApiGatewayV2("NimoCryptocurrencyApi");
    api.route("GET /", {
      handler: "api/index.health",
    });
    api.route("GET /register", {
      link: [secret],
      handler: "api/index.createUser",
    });
    api.route("GET /search", {
      link: [secret],
      handler: "api/index.search",
    });
    api.route("GET /history", {
      link: [secret],
      handler: "api/index.history",
    });

    return {
      api: api.url,
    };
  },
});
