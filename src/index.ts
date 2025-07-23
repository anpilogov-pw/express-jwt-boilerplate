import express, { Express, Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import helmet from 'helmet';
import router from './router';

const app: Express = express();
const port: string = process.env.PORT || '3000';

app.use(helmet());
app.use(cors<Request>());
app.use(express.json({ limit: '10kb' }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('ok');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`App start on http://localhost:${port}`);
});
