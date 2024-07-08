/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    NimoCryptocurrencyApi: {
      type: "sst.aws.ApiGatewayV2"
      url: string
    }
    NimoCryptocurrencySearchHistory: {
      name: string
      type: "sst.aws.Dynamo"
    }
  }
}
export {}