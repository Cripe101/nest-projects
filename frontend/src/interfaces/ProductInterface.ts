export interface IProductGet {
  _id: string;
  productName: string;
  productCategory: string;
  buyingPrice: number;
  sellingPrice: number;
  stock: number;
  description?: string;
  imageUrl?: string;
}

export interface IProductPost {
  productName: string;
  productCategory: string;
  buyingPrice: number;
  sellingPrice: number;
  description?: string;
  imageUrl?: string;
}

export interface IProductSaleGet {
  _id: string;
  productId: IProductGet;
  quantity: number;
  sellingPrice: number;
  buyingPrice: number;
  totalPrice: number;
  profit: number;
  createdAt: string;
}
