import express, { Express, Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import helmet from 'helmet';
import router from './router';
import chalk from 'chalk';

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
  console.clear();
  console.log(chalk.green.bold('\n🚀 App started successfully\n'));
  console.table({
    'Local URL': `http://localhost:${port}`,
    Port: port,
    Status: 'Listening...',
  });
});
