export class CreateInventoryCommand {
  constructor(
    public readonly productId: string,
    public readonly createdBy: string,
    public readonly currentStock: number,
    public readonly minimumStock: number,
  ) {}
}
