import express from 'express';
import cors from 'cors';
import { getCityListRouter } from './Moduls/StartAppPayload/Routers/cityListRoute';
import { getRequestCallRouter } from './Moduls/RequestCall/Routers/RequestCallRouter';
import cookieParser from 'cookie-parser';
import { getAuthRouter } from './Moduls/Authentication/Routers/authenticationRouter';
import { getPhoneNumberRouter } from './Moduls/StartAppPayload/Routers/phoneNumberRoute';
import errorMiddleware from './middlewares/errorMiddleware';


export const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);
app.use(cookieParser());
// app.use(cors({ credentials: true, origin: 'http://localhost:3000', }));
const corsOptions = {
	credentials: true,
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);
// app.options('*', corsMiddleware);


app.use('/phone_number', getPhoneNumberRouter());
app.use('/citys_list', getCityListRouter());
app.use('/request_call', getRequestCallRouter());
app.use('/auth', getAuthRouter());
// app.use('/__test__', getTestsRouter(dbRequestCall));
app.use(errorMiddleware);



