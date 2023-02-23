import express from 'express';
import { dbPhoneNumber } from './db/db';
import cors from 'cors';
import { getPhoneNumberRouter } from './Routes/phoneNumberRoute';
import { getTestsRouter } from './Routes/testsRoutes';



export const app = express();

const jsonBodyMiddleware = express.json();

const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const corsMiddleware = cors(corsOptions);

app.use(jsonBodyMiddleware);

app.use(corsMiddleware);
app.options('*', corsMiddleware);


app.use('/phone_number', getPhoneNumberRouter());
app.use('/__test__', getTestsRouter(dbPhoneNumber));




