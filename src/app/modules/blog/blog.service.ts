import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog, authorId: string) => {
  const blogPayload = { ...payload, author: authorId };
  const result = await Blog.create(blogPayload);
  return await Blog.findById(result._id)
    .populate({
      path: 'author',
      select: 'name email _id',
    })
    .select('title content author _id');
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate({
      path: 'author',
      select: 'name email _id',
    }),
    query,
  )
    .search(['title', 'content'])
    .filter()
    .sort();

  const result = await blogQuery.modelQuery.select('title content author _id');
  return result;
};
const getSingleBlogFromDB = async (id: string) => {
  const isBlogExists = await Blog.findById(id);
  if (!isBlogExists) {
    throw new AppError(404, 'Blog does not exist');
  }
  const result = await Blog.findById(id).populate({
    path: 'author',
    select: 'name email _id',
  });
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const isBlogExists = await Blog.findById(id);
  if (!isBlogExists) {
    throw new AppError(404, 'Blog does not exist');
  }
  await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return await Blog.findById(id)
    .populate({
      path: 'author',
      select: 'name email _id',
    })
    .select('title content author _id');
};

const deleteBlogIntoDB = async (id: string) => {
  const isBlogExists = await Blog.findById(id);
  if (!isBlogExists) {
    throw new AppError(404, 'Blog does not exist');
  }
  const result = await Blog.findByIdAndDelete(
    { _id: id },
    {
      new: true,
    },
  );
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
