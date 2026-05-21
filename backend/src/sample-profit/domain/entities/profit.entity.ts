import { NotAcceptableException } from '@nestjs/common';

export class Profit {
  constructor(
    public amount: number,
    public description: string,
    public date: Date,
  ) {
    if (amount < 0) {
      throw new NotAcceptableException('Profit amount cannot be negative');
    }
  }
}
