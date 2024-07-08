/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    ApiKey: {
      type: "sst.sst.Secret"
      value: string
    }
    Drizzle: {
      type: "sst.sst.Secret"
      value: string
    }
    MailHost: {
      type: "sst.sst.Secret"
      value: string
    }
    MailPassword: {
      type: "sst.sst.Secret"
      value: string
    }
    MailPort: {
      type: "sst.sst.Secret"
      value: string
    }
    MailUsername: {
      type: "sst.sst.Secret"
      value: string
    }
    NimoCryptocurrencyApi: {
      type: "sst.aws.ApiGatewayV2"
      url: string
    }
  }
}
export {}