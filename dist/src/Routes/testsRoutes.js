"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsRouter = void 0;
const express_1 = __importDefault(require("express"));
const HTTP_Status_1 = require("../HTTP_Status/HTTP_Status");
const getTestsRouter = (dbTel, dbCity, dbCall) => {
    const testRouter = express_1.default.Router();
    //----------------- только для тестов
    testRouter.delete('/data', (req, res) => {
        dbTel.phoneNumber = '';
        res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    testRouter.delete('/city', (req, res) => {
        dbCity.citysList = [];
        res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    testRouter.delete('/call', (req, res) => {
        dbCall.requestCall = [];
        res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    //-----------
    return testRouter;
};
exports.getTestsRouter = getTestsRouter;
