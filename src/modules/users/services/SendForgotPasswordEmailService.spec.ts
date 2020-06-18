import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendforgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    await fakeUsersRepository.create({
      name: 'JOHN JONES',
      email: 'jon@email.com',
      password: '12345',
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotPasswordEmailService.execute({
      email: 'jon@email.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password using non-existing user email', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'test@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able a reset the password ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'JOHN JONES',
      email: 'jon@email.com',
      password: '12345',
    });

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    await sendForgotPasswordEmailService.execute({ email: 'jon@email.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
