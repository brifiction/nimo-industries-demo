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
    const apiKey = new sst.Secret("ApiKey", "apiKey");
    const drizzle = new sst.Secret("Drizzle", "connection-string");
    const mailHost = new sst.Secret("MailHost", "MailHost");
    const mailPort = new sst.Secret("MailPort", "MailPort");
    const mailUsername = new sst.Secret("MailUsername", "MailUsername");
    const mailPassword = new sst.Secret("MailPassword", "MailPassword");

    const api = new sst.aws.ApiGatewayV2("NimoCryptocurrencyApi");

    api.route("GET /", {
      handler: "api/service.health",
    });
    api.route("GET /register", {
      link: [drizzle, mailHost, mailPort, mailUsername, mailPassword],
      handler: "api/user.createUser",
    });
    api.route("GET /search", {
      link: [apiKey, drizzle, mailHost, mailPort, mailUsername, mailPassword],
      handler: "api/index.search",
    });
    api.route("GET /history", {
      link: [apiKey, drizzle, mailHost, mailPort, mailUsername, mailPassword],
      handler: "api/index.history",
    });

    return {
      api: api.url,
    };
  },
});
