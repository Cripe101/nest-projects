export class InventoryEntity {
  constructor(
    public productId: string,
    public currentStock: number,
    public minimumStock: number,
    public _id?: string,
  ) {}
}
