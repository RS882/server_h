"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityListRouter = void 0;
const express_1 = __importDefault(require("express"));
const cityListCntroller_1 = require("../Controller/cityListCntroller");
const getCityListRouter = () => {
    const cityListRouter = express_1.default.Router();
    cityListRouter.get('/', cityListCntroller_1.citysListController.get);
    cityListRouter.get('/:id([0-9]+)', cityListCntroller_1.citysListController.get);
    cityListRouter.post('/', cityListCntroller_1.citysListController.post);
    cityListRouter.put('/:id([0-9]+)', cityListCntroller_1.citysListController.put);
    cityListRouter.put('/', cityListCntroller_1.citysListController.put);
    cityListRouter.delete('/', cityListCntroller_1.citysListController.delete);
    cityListRouter.delete('/:id([0-9]+)', cityListCntroller_1.citysListController.delete);
    return cityListRouter;
};
exports.getCityListRouter = getCityListRouter;
