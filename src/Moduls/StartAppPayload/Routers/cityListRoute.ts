import express from 'express';
import { citysListController } from '../Controllers/cityListCntroller';



export const getCityListRouter = () => {


	const cityListRouter = express.Router();

	cityListRouter.get('/', citysListController.get);
	cityListRouter.get('/:id', citysListController.get);
	cityListRouter.post('/', citysListController.post);
	cityListRouter.put('/:id', citysListController.put);
	cityListRouter.put('/', citysListController.put);
	cityListRouter.delete('/', citysListController.delete);
	cityListRouter.delete('/:id', citysListController.delete);

	return cityListRouter;

};
