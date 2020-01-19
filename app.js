import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import routes from './src/routes/index';

const app = express();

// Application-Level Middleware

app.use('/api/auth', routes.auth);
app.use('/', routes.content);

const PORT = config.get('port') || 5000;
const DB_URI = config.get('mongoUri');

async function start() {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (e) {
    console.warn('Server error', e);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => console.log(`App start in ${PORT}`));
