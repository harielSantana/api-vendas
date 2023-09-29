import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
  }: IRequest): Promise<User | undefined> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne({ id: id });

    if (!user) {
      throw new Error('Product not found');
    }

    const userExists = await userRepository.findByName(name);

    if (userExists && email !== user.email) {
      throw new AppError('There already exists user with email' + email);
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
