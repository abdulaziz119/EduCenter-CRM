import * as dotenv from 'dotenv';

dotenv.config();

const DB_PORT = +process.env.DB_PORT || 27017;
const DB_HOST = process.env.DB_HOST || '';
const DB_USER = process.env.DB_USERNAME || '';
const DB_DB = process.env.DB_DATABASE || '';
const DB_PASS = process.env.DB_PASSWORD || '';
const JWT_SECRET = process.env.JWT_SECRET;

// Xato tekshirish
if (!DB_HOST || !DB_USER || !DB_DB || !DB_PASS || !JWT_SECRET) {
  throw new Error(
    'One of the environmental variables is missing. Please check the .env file.',
  );
}

export { DB_PORT, DB_HOST, DB_USER, DB_DB, DB_PASS, JWT_SECRET };
