import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Profit {
  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  amount!: number;
}

export const ProfitSchema = SchemaFactory.createForClass(Profit);
