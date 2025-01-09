import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import jwt from 'jsonwebtoken';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return await User.findById(result._id).select('name email _id');
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  // // checking if the user is blocked

  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(403, 'This user is blocked !');
  }

  const email = user?.email;

  if (email !== payload.email) {
    throw new AppError(401, 'Invalid Credentials');
  }

  // // checking if the password is correct

  const password = user?.password as string;

  if (!(await User.isPasswordMatched(payload.password, password))) {
    throw new AppError(403, 'Invalid Credentials');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    id: user?._id,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  return {
    token,
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
