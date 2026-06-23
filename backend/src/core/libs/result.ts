// export class Result<T, E = Error> {
//   private constructor(
//     public readonly isSuccess: boolean,
//     public readonly value?: T,
//     public readonly error?: E,
//   ) {}

//   static ok(): Result<void, never> {
//     return new Result(true);
//   }

//   static okWithValue<T>(value: T): Result<T, never> {
//     return new Result(true, value);
//   }

//   static fail<E>(error: E): Result<never, E> {
//     return new Result<never, E>(false, undefined, error);
//   }
// }

export { Result, err, ok } from 'neverthrow';
