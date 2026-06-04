export class UpdateInventoryCommand {
  constructor(
    public readonly _id: string,
    public readonly productId: string,
    public readonly currentStock: number,
    public readonly minimumStock: number,
  ) {}
}
