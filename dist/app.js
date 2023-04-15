"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cityListRoute_1 = require("./Moduls/StartAppPayload/Routers/cityListRoute");
const RequestCallRouter_1 = require("./Moduls/RequestCall/Routers/RequestCallRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authenticationRouter_1 = require("./Moduls/Authentication/Routers/authenticationRouter");
const phoneNumberRoute_1 = require("./Moduls/StartAppPayload/Routers/phoneNumberRoute");
exports.app = (0, express_1.default)();
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
exports.app.use((0, cookie_parser_1.default)());
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const corsMiddleware = (0, cors_1.default)(corsOptions);
exports.app.use(corsMiddleware);
exports.app.options('*', corsMiddleware);
exports.app.use('/phone_number', (0, phoneNumberRoute_1.getPhoneNumberRouter)());
exports.app.use('/citys_list', (0, cityListRoute_1.getCityListRouter)());
exports.app.use('/request_call', (0, RequestCallRouter_1.getRequestCallRouter)());
exports.app.use('/request_call', (0, RequestCallRouter_1.getRequestCallRouter)());
exports.app.use('/auth', (0, authenticationRouter_1.getAuthRouter)());
// app.use('/__test__', getTestsRouter(dbRequestCall));