export class DeleteProductCommand {
  constructor(
    public readonly id: string,
    public readonly user_id: string,
  ) {}
}
