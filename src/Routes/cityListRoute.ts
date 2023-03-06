import express from 'express';
import { citysListController } from '../Controller/cityListCntroller';
import { ICitysList } from '../db/db';


export const getCityListRouter = (db: ICitysList) => {


	const cityListRouter = express.Router();

	cityListRouter.get('/', (req, res) => citysListController.get(req, res, db));
	cityListRouter.get('/:id', (req, res) => citysListController.get(req, res, db));
	cityListRouter.post('/', citysListController.post);
	cityListRouter.put('/:id', citysListController.put);
	cityListRouter.put('/', citysListController.put);
	cityListRouter.delete('/', citysListController.delete);
	cityListRouter.delete('/:id', citysListController.delete);

	return cityListRouter;

};
