import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './router/api';
import morgan from 'morgan';

const app = express();
app.use(cookieParser());
app.use(morgan('combined'));
const port = 3000;

app.use('/api', routes);
app.listen(port, () => {
  // console.log('hello to server form ts')
  return 0;
});

export default app;
