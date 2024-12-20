import { User } from './user.model';
import AppError from '../../errors/AppError';

const blockUserInDB = async (userId: string) => {
  // Find the user by ID
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // Update the `isBlocked` property
  user.isBlocked = true;
  await user.save();

  return user;
};

export const AdminService = {
  blockUserInDB,
};
