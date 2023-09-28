import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne({ id: id });

    if (!user) {
      throw new AppError('User not found');
    }

    await userRepository.remove(user);
  }
}

export default DeleteUserService;
