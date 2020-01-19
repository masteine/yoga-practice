import mongoose from 'mongoose';

import Content from './Content';
import User from './User';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { Content, User };

export { connectDb };

export default models;
