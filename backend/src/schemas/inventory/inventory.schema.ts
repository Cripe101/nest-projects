import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ required: true })
  productId!: string;

  @Prop({ required: true })
  currentStock!: number;

  @Prop({ required: true })
  minimumStock!: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
