import express from 'express';
import quotesRouter from './quotes.js';

const apiRouter = express.Router();
apiRouter.use('/quotes', quotesRouter);

export default apiRouter;