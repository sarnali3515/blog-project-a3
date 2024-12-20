import { Request, Response, NextFunction } from 'express';
import { Blog } from '../modules/blog/blog.model';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';

const isAuthorOrAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new AppError(404, 'Blog does not exist');
    }

    if (
      blog.author.toString() === req.user.id.toString() ||
      req.user.role === 'admin'
    ) {
      return next();
    }

    return next(
      new AppError(403, 'You are not authorized to perform this action.'),
    );
  },
);

export default isAuthorOrAdmin;
