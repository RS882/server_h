import express from 'express';
import { citysListController } from '../Controller/cityListCntroller';
import { ICitysList } from '../db/types';


export const getCityListRouter = (db: ICitysList) => {


	const cityListRouter = express.Router();

	cityListRouter.get('/', citysListController.get(db));
	cityListRouter.get('/:id', citysListController.get(db));
	cityListRouter.post('/', citysListController.post);
	cityListRouter.put('/:id', citysListController.put);
	cityListRouter.put('/', citysListController.put);
	cityListRouter.delete('/', citysListController.delete);
	cityListRouter.delete('/:id', citysListController.delete);

	return cityListRouter;

};
