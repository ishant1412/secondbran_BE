import { z } from 'zod';
import { envSchema } from './types';
import dotenv from 'dotenv';

dotenv.config();  // load .env file

// Define schema


// Parse and validate
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.flatten().fieldErrors);
  process.exit(1);  // exit app if env invalid
}

export const env = _env.data;
