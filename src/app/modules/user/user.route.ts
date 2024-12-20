import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

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
router.get('/users', auth('user', 'admin'), UserControllers.getAllUsers);

router.get('/users/:id', UserControllers.getSingleUser);

export const UserRoutes = router;
