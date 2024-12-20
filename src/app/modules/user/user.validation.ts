import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'User must be string',
    }),
    email: z.string({
      invalid_type_error: 'Email must be string',
    }),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'ID is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginValidationSchema,
};
