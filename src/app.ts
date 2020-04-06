import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import { join } from 'path';
import brandsRouter from './api/brands';
import healthRouter from './api/health';
import usersRouter from './api/users';
import mongoLoader from './loaders/mongoose';

// load env variables
dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/', healthRouter);
app.use('/brands', brandsRouter);
app.use('/users', usersRouter);

// init rabbitmq subscriber(s)
// const templateSubscriber = Container.get(TemplateSubscriber);
// templateSubscriber.subscribeTemplateSequence();

mongoLoader();

export default app;
