"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const phoneNumberRoute_1 = require("./Routes/phoneNumberRoute");
// import { db } from './db/db';
// import { getUsersRouter } from './Routes/users';
// import { getTestsRouter } from './Routes/testsRoutes';
// import { getOtherRouter } from './Routes/othersRoutes';
exports.app = (0, express_1.default)();
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
exports.app.use('/phone_number', (0, phoneNumberRoute_1.getPhoneNumberRouter)(db_1.dbPhoneNumber));
// app.use('/__test__', getTestsRouter(db));
// app.use('/', getOtherRouter());
