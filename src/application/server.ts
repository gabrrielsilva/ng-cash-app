import express from 'express';
import { transactionRoutes } from './controller/transactionController';
import { userRoutes } from './controller/userController';
import './main';

const app = express();
app.use(express.json());
app.use('/user', userRoutes);
app.use('/transaction', transactionRoutes)
app.listen(3000, () => console.log('Server is running in http://localhost:3000'));