/* eslint-disable no-restricted-syntax */
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.production',
});
