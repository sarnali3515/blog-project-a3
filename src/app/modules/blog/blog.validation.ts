import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'title must be string',
    }),
    content: z.string({
      invalid_type_error: 'Content must be string',
    }),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
};
