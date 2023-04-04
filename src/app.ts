import express from 'express';
import { dbRequestCall } from './db/types';
import cors from 'cors';
import { getPhoneNumberRouter } from './Routes/phoneNumberRoute';
import { getTestsRouter } from './Routes/testsRoutes';
import { getCityListRouter } from './Routes/cityListRoute';
import { getRequestCallRouter } from './Routes/RequestCallRouter';



export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);
app.options('*', corsMiddleware);


app.use('/phone_number', getPhoneNumberRouter());
app.use('/citys_list', getCityListRouter());
app.use('/request_call', getRequestCallRouter(dbRequestCall));
app.use('/__test__', getTestsRouter(dbRequestCall));




