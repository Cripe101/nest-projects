export class CreateProductCommand {
  constructor(
    public readonly productName: string,
    public readonly productCategory: string,
    public readonly buyingPrice: number,
    public readonly sellingPrice: number,
    public readonly stock: number,
    public readonly description?: string,
    public readonly imageUrl?: string,
  ) {}
}
