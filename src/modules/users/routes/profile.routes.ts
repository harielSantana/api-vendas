import { Router } from 'express';
import { Segments, celebrate } from 'celebrate';
import multer from 'multer';
import Joi from 'joi';

import isAuthenticated from '../middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', { is: Joi.exist(), then: Joi.required() }),
    },
  }),
  profileController.update,
);

export default profileRouter;
