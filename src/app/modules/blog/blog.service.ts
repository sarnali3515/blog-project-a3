import QueryBuilder from '../../builder/QueryBuilder';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(['title', 'content'])
    .filter()
    .sort();

  const result = await blogQuery.modelQuery;
  return result;
};
const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
};
