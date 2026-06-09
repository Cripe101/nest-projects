import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ required: true })
  productName!: string;

  @Prop({ required: true })
  productCategory!: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserEntity',
    required: true,
  })
  addedBy!: mongoose.Types.ObjectId;

  @Prop({ required: true, type: Number })
  buyingPrice!: number;

  @Prop({ required: true, type: Number })
  sellingPrice!: number;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  imageUrl!: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
