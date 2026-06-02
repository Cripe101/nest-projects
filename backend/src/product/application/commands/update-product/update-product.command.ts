export class UpdateProductCommand {
  constructor(
    public readonly _id: string,
    public readonly productName: string,
    public readonly productCategory: string,
    public readonly sellingPrice: number,
    public readonly buyingPrice: number,
    public readonly stock: number,
    public readonly imageUrl?: string,
    public readonly description?: string,
  ) {}
}
