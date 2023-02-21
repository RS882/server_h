import express from 'express';
import { dbPhoneNumber } from './db/db';

import { getPhoneNumberRouter } from './Routes/phoneNumberRoute';
import { getTestsRouter } from './Routes/testsRoutes';


export const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);


app.use('/phone_number', getPhoneNumberRouter());
app.use('/__test__', getTestsRouter(dbPhoneNumber));




