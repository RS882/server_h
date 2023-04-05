import express from 'express';
import { citysListController } from '../Controller/cityListCntroller';



export const getCityListRouter = () => {


	const cityListRouter = express.Router();

	cityListRouter.get('/', citysListController.get);
	cityListRouter.get('/:id([0-9]+)', citysListController.get);
	cityListRouter.post('/', citysListController.post);
	cityListRouter.put('/:id([0-9]+)', citysListController.put);
	cityListRouter.put('/', citysListController.put);
	cityListRouter.delete('/', citysListController.delete);
	cityListRouter.delete('/:id([0-9]+)', citysListController.delete);

	return cityListRouter;

};
