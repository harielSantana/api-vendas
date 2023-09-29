import { getCustomRepository } from 'typeorm';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    console.log('UserToken', userToken?.id);

    if (!userToken) {
      throw new AppError('User Token not found');
    }

    const user = await usersRepository.findById(userToken.user_id);

    console.log(' User', user);

    if (!user) {
      throw new AppError('User not found');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
