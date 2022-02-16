import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './router/api';

const app = express();
app.use(cookieParser());
const port = 3000;

app.use('/api', routes);
app.listen(port, () => {
  // console.log('hello to server form ts')
  return 0;
});

export default app;
