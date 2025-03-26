import { IProductsResponse } from "../types/products";
import { urls } from "./urls";
import { generateClient } from "./client";

export const fetchProductsList = async () => {
  const client = generateClient();
  const response = await client.get<IProductsResponse>(urls.product.list);
  return response.data;
};
