import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Inventory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductEntity',
    required: true,
  })
  productId!: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserEntity',
    required: true,
  })
  createdBy!: mongoose.Types.ObjectId;

  @Prop({ required: true })
  currentStock!: number;

  @Prop({ required: true })
  minimumStock!: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
