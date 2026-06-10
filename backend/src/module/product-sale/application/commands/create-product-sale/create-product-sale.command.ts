export class CreateProductSaleCommand {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly cashier: string,
  ) {}
}
