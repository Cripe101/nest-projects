import type { IProductGet } from "./ProductInterface";

export interface IInventoryPost {
  productId: string;
  currentStock: number;
  minimumStock: number;
}

export interface IInventoryGet {
  _id: string;
  productId: IProductGet;
  currentStock: number;
  minimumStock: number;
}
