import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class ProductSale {
  @Prop({ required: true })
  productId!: string;

  @Prop({ required: true })
  quantity!: number;

  @Prop({ required: true, type: Number })
  buyingPrice!: number;

  @Prop({ required: true, type: Number })
  sellingPrice!: number;

  @Prop({ required: true, type: Number })
  totalPrice!: number;

  @Prop({ required: false })
  profit?: number;
}

export const ProductSaleSchema = SchemaFactory.createForClass(ProductSale);
