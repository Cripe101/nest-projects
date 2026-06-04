export class CreateInventoryCommand {
  constructor(
    public readonly productId: string,
    public currentStock: number,
    public minimumStock: number,
  ) {}
}
