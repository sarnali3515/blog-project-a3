import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import jwt from 'jsonwebtoken';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  // // checking if the user is blocked

  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(403, 'This user is blocked !');
  }

  // // checking if the password is correct

  if (!(await User.isPasswordMatched(payload.password, user?.password))) {
    throw new AppError(403, 'Password do not match !');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    id: user?._id,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  return {
    accessToken,
  };
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
