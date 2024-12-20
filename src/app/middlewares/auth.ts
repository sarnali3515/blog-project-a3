import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../errors/AppError';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }
    next();
  });
};
export default auth;
