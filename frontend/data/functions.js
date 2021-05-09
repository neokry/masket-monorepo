import client from ".";
import { PRODUCTS_ORDERED_BY_DATE } from "./queries";

export const getProducts = async () => {
  const req = await client.request(PRODUCTS_ORDERED_BY_DATE);
  let products = req.products;
  return products;
};
