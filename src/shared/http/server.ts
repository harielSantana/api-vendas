import express from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/erros/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
  }
);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
