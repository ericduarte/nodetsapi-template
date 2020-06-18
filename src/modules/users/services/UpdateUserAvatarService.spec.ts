import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    await updateUserAvatar.execute({
      avatarFilename: 'teste.jpg',
      user_id: user.id,
    });

    expect(user.avatar).toBe('teste.jpg');
  });

  it('should be able to update avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    await updateUserAvatar.execute({
      avatarFilename: 'teste.jpg',
      user_id: user.id,
    });
    expect(user.avatar).toBe('teste.jpg');

    await updateUserAvatar.execute({
      avatarFilename: 'teste1.jpg',
      user_id: user.id,
    });
    expect(user.avatar).toBe('teste1.jpg');
  });

  it('should not be able to update avatar of inexistent user', async () => {
    await expect(
      updateUserAvatar.execute({
        avatarFilename: 'teste.jpg',
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be delete old avater before update avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    await updateUserAvatar.execute({
      avatarFilename: 'teste.jpg',
      user_id: user.id,
    });

    await updateUserAvatar.execute({
      avatarFilename: 'teste1.jpg',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('teste.jpg');
    expect(user.avatar).toBe('teste1.jpg');
  });
});
