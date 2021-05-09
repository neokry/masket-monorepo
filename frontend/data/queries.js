import { gql } from "graphql-request";

export const PRODUCTS_ORDERED_BY_DATE = gql`
  {
    products(orderBy: createdOn) {
      id
      price
      metadata
      seller {
        id
      }
      createdOn
    }
  }
`;
