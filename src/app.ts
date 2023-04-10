import express from 'express';

import cors from 'cors';
import { getPhoneNumberRouter } from './Routes/phoneNumberRoute';

import { getCityListRouter } from './Routes/cityListRoute';
import { getRequestCallRouter } from './Routes/RequestCallRouter';
import cookieParser from 'cookie-parser';
import { getAuthRouter } from './Moduls/Authentication/Routers/authenticationRouter';



export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
app.use(cookieParser());

const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);
app.options('*', corsMiddleware);


app.use('/phone_number', getPhoneNumberRouter());
app.use('/citys_list', getCityListRouter());
app.use('/request_call', getRequestCallRouter());
app.use('/request_call', getRequestCallRouter());
app.use('/auth', getAuthRouter());
// app.use('/__test__', getTestsRouter(dbRequestCall));




