import { getCustomRepository } from 'typeorm';

import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const products = await userRepository.find();

    return products;
  }
}

export default ListUserService;
