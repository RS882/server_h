"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsRouter = void 0;
const express_1 = __importDefault(require("express"));
const HTTP_Status_1 = require("../HTTP_Status/HTTP_Status");
const getTestsRouter = (db) => {
    const testRouter = express_1.default.Router();
    //----------------- только для тестов
    testRouter.delete('/data', (req, res) => {
        db.phoneNumber = '';
        res.sendStatus(HTTP_Status_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    //-----------
    return testRouter;
};
exports.getTestsRouter = getTestsRouter;
