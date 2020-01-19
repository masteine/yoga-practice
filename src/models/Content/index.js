import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  type: String,
  tag: String,
  title: String,
  body: String,
  url: String
});

const Content = mongoose.model('Content', schema);

export default Content;
