import express from 'express';
import { dbPhoneNumber } from './db/db';

import { getPhoneNumberRouter } from './Routes/phoneNumberRoute';
import { getTestsRouter } from './Routes/testsRoutes';
// import { db } from './db/db';
// import { getUsersRouter } from './Routes/users';
// import { getTestsRouter } from './Routes/testsRoutes';
// import { getOtherRouter } from './Routes/othersRoutes';

export const app = express();

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);


app.use('/phone_number', getPhoneNumberRouter());
app.use('/__test__', getTestsRouter(dbPhoneNumber));
// app.use('/__test__', getTestsRouter(db));
// app.use('/', getOtherRouter());




