import { Router } from 'express';
import UsersController from '../controllers/UserController';
import { Segments, celebrate } from 'celebrate';
import Joi from 'joi';

const userRouter = Router();
const userController = new UsersController();

userRouter.get('/', userController.index);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);
