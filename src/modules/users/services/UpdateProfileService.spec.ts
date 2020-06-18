import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'João Jones',
      email: 'joao@email.com',
    });

    expect(updatedUser.name).toBe('João Jones');
    expect(updatedUser.email).toBe('joao@email.com');
  });

  it('should not be able to change to ab=nother user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    const user = await fakeUsersRepository.create({
      name: 'RAUL SEIXAS',
      email: 'raulseixas@email.com',
      password: '12345',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'RAUL SEIXAS',
        email: 'jon@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'RAUL SEIXAS',
        email: 'jon@email.com',
        password: '11232',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'RAUL SEIXAS',
      email: 'raulseixas@email.com',
      password: '12345',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'RAUL SEIXAS',
        email: 'jon@email.com',
        password: '11232',
        old_password: '123455',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'RAUL SEIXAS',
      email: 'raulseixas@email.com',
      password: '12345',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'RAUL SEIXAS',
      email: 'raulseixas@email.com',
      old_password: '12345',
      password: '123123',
    });
    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update a profile from non-existing user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'non-existing-user-name',
        email: 'non-existing-user-email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
