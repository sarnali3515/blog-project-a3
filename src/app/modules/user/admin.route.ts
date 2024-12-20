import express from 'express';
import auth from '../../middlewares/auth';
import { BlogControllers } from '../blog/blog.controller';
import { AdminController } from './admin.controller';

const router = express.Router();

router.delete('/blogs/:id', auth('admin'), BlogControllers.deleteBlog);

router.patch('/users/:userId/block', auth('admin'), AdminController.blockUser);

export const AdminRoutes = router;
