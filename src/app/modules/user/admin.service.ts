import { User } from './user.model';
import AppError from '../../errors/AppError';

const blockUserInDB = async (userId: string) => {
  const user = await User.findById(userId);

  if (user?.isBlocked) {
    throw new AppError(404, 'This user is already blocked');
  }

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  user.isBlocked = true;
  await user.save();

  return user;
};

export const AdminService = {
  blockUserInDB,
};
