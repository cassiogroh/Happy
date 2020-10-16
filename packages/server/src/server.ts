import 'dotenv/config';
import express from 'express';
import path from 'path';
import 'express-async-errors';
import cors from 'cors';

import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors({
  origin: `${process.env.WEB_URL}`,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Happy server running on port ${port}`));