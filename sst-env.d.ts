/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    DbUrl: {
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