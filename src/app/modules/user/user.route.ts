import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/register',

  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);
router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);
router.get('/users', UserControllers.getAllUsers);

router.get('/users/:id', UserControllers.getSingleUser);

export const UserRoutes = router;
