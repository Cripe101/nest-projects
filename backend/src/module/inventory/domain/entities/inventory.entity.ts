export class InventoryEntity {
  constructor(
    public productId: string,
    public createdBy: string,
    public minimumStock: number,
    public currentStock: number,
    public _id?: string,
  ) {
    if (currentStock! < 0) {
      throw new Error('Stock connot be negative');
    }

    if (minimumStock < 0) {
      throw new Error('Minimum stock connot be negative');
    }
  }
}
