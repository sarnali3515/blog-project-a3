import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import isAuthorOrAdmin from '../../middlewares/isAuthorOrAdmin';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get('/', BlogControllers.getAllBlogs);

router.get('/:id', BlogControllers.getSingleBlog);

router.patch(
  '/:id',
  auth('user'),
  isAuthorOrAdmin,
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete(
  '/:id',
  auth('user'),
  isAuthorOrAdmin,
  BlogControllers.deleteBlog,
);

export const BlogRoutes = router;
