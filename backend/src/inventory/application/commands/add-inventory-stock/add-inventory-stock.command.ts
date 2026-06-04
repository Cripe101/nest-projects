export class AddInventoryStockCommand {
  constructor(
    public readonly inventoryId: string,
    public readonly quantity: number,
  ) {}
}
