"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestCallRouter = void 0;
const express_1 = __importDefault(require("express"));
const requestCallCntroller_1 = require("../Controller/requestCallCntroller");
const getRequestCallRouter = (db) => {
    const requsestCallRouter = express_1.default.Router();
    requsestCallRouter.get('/', (req, res) => requestCallCntroller_1.requestCallController.get(req, res, db));
    requsestCallRouter.get('/:id', (req, res) => requestCallCntroller_1.requestCallController.get(req, res, db));
    requsestCallRouter.post('/', (req, res) => requestCallCntroller_1.requestCallController.post(req, res, db));
    requsestCallRouter.put('/:id', requestCallCntroller_1.requestCallController.put);
    requsestCallRouter.put('/', requestCallCntroller_1.requestCallController.put);
    requsestCallRouter.delete('/', requestCallCntroller_1.requestCallController.delete);
    requsestCallRouter.delete('/:id', requestCallCntroller_1.requestCallController.delete);
    return requsestCallRouter;
};
exports.getRequestCallRouter = getRequestCallRouter;
