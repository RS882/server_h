"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const cors_1 = __importDefault(require("cors"));
const phoneNumberRoute_1 = require("./Routes/phoneNumberRoute");
const testsRoutes_1 = require("./Routes/testsRoutes");
exports.app = (0, express_1.default)();
const jsonBodyMiddleware = express_1.default.json();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const corsMiddleware = (0, cors_1.default)(corsOptions);
exports.app.use(jsonBodyMiddleware);
exports.app.use(corsMiddleware);
exports.app.options('*', corsMiddleware);
exports.app.use('/phone_number', (0, phoneNumberRoute_1.getPhoneNumberRouter)());
exports.app.use('/__test__', (0, testsRoutes_1.getTestsRouter)(db_1.dbPhoneNumber));
