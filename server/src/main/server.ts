import express, { Router } from 'express';
import { readdirSync } from 'fs';

const app = express();
const router = Router();

readdirSync(`${__dirname}/route`).map(async file => {
  (await import(`./route/${file}`)).default(router);
})

app.use(express.json());
app.use('/api', router);
app.listen(3000, () => console.log('Server is running in http://localhost:3000'));

export default app;