import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }

  if (!(await User.isPasswordMatched(payload.password, user?.password))) {
    throw new AppError(403, 'Password do not match !');
  }
  return {};
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
