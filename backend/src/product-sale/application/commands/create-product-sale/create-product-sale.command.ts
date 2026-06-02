export class CreateProductSaleCommand {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly sellingPrice: number,
    public readonly buyingPrice: number,
    public readonly totalPrice: number,
    public readonly profit: number,
  ) {}
}
