import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Jones',
      email: 'jon@email.com',
      password: '12345',
    });

    const profile = await showUserProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jonh Jones');
    expect(profile.email).toBe('jon@email.com');
  });

  it('should not be able to show a profile from non-existing user', async () => {
    await expect(
      showUserProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
