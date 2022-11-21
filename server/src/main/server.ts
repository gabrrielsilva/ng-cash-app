import cors from 'cors';
import express, { Router } from 'express';
import { readdirSync } from 'fs';

const app = express();
const router = Router();

readdirSync(`${__dirname}/route`).map(async file => {
  (await import(`./route/${file}`)).default(router);
})

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.listen(3333, () => console.log('Server is running in http://localhost:3333'));

export default app;