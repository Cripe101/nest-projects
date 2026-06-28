import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserHandler } from './update-user.handler';
import { UpdateUserCommand } from './update-user.command';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../../ports/user.repository.port';
import { ok, err } from '@core/libs/result';
import { UserError } from '@modules/user/domain/errors/user.error';
import { UserRole } from '@core/constants/user-role.enum';

describe('UpdateUserHandler', () => {
  let handler: UpdateUserHandler;
  let repository: jest.Mocked<UserRepositoryPort>;

  beforeEach(async () => {
    repository = {
      getUserByUsername: jest.fn(),
      updateOneUser: jest.fn(),
    } as unknown as jest.Mocked<UserRepositoryPort>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserHandler,
        {
          provide: USER_REPOSITORY,
          useValue: repository,
        },
      ],
    }).compile();

    handler = module.get(UpdateUserHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const command = new UpdateUserCommand(
    'user-id',
    'Mheg',
    'Ryan',
    'Lim',
    'mheg@example.com',
    'mhegz',
    UserRole.STAFF,
  );

  it('should update the user successfully', async () => {
    repository.getUserByUsername.mockResolvedValue(
      ok({
        _id: 'user-id',
        username: 'mhegz',
      } as any),
    );

    repository.updateOneUser.mockResolvedValue(
      ok({
        _id: 'user-id',
      } as any),
    );

    const result = await handler.execute(command);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) expect(result.value).toBe('user-id');
    expect(repository.getUserByUsername).toHaveBeenCalledWith('mhegz');
    expect(repository.updateOneUser).toHaveBeenCalledWith('user-id', {
      _id: 'user-id',
      firstName: 'Mheg',
      middleName: 'Ryan',
      lastName: 'Lim',
      email: 'mheg@example.com',
      username: 'mhegz',
      role: UserRole.STAFF,
    });
  });

  it('should return DUPLICATE_USERNAME when username belongs to another user', async () => {
    repository.getUserByUsername.mockResolvedValue(
      ok({
        _id: 'another-user-id',
        username: 'johndoe',
      } as any),
    );

    const result = await handler.execute(command);

    expect(result.isErr()).toBe(true);
    if (result.isErr()) expect(result.error).toBe(UserError.DUPLICATE_USERNAME);
    expect(repository.updateOneUser).not.toHaveBeenCalled();
  });

  it('should allow update when username belongs to the same user', async () => {
    repository.getUserByUsername.mockResolvedValue(
      ok({
        _id: 'user-id',
        username: 'johndoe',
      } as any),
    );

    repository.updateOneUser.mockResolvedValue(
      ok({
        _id: 'user-id',
      } as any),
    );

    const result = await handler.execute(command);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) expect(result.value).toBe('user-id');
  });

  it('should update even when username does not exist', async () => {
    repository.getUserByUsername.mockResolvedValue(err(UserError.NOT_FOUND));

    repository.updateOneUser.mockResolvedValue(
      ok({
        _id: 'user-id',
      } as any),
    );

    const result = await handler.execute(command);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) expect(result.value).toBe('user-id');
  });
});
