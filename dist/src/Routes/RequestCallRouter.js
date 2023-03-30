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
    requsestCallRouter.get('/', requestCallCntroller_1.requestCallController.get(db));
    requsestCallRouter.get('/:id', requestCallCntroller_1.requestCallController.get(db));
    requsestCallRouter.post('/', requestCallCntroller_1.requestCallController.post(db));
    requsestCallRouter.put('/:id', requestCallCntroller_1.requestCallController.put);
    requsestCallRouter.put('/', requestCallCntroller_1.requestCallController.put);
    requsestCallRouter.delete('/:id([0-9]+)', requestCallCntroller_1.requestCallController.delete(db));
    return requsestCallRouter;
};
exports.getRequestCallRouter = getRequestCallRouter;
