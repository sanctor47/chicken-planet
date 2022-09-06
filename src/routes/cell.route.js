import express from 'express';
import * as cellController from '../controllers/cell.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all cells
router.get('', userAuth, cellController.getAllCells);

//route to create a new cell
router.post('', userAuth, cellController.newCell);

//route to get a single cell by their cell id
router.get('/:_id', userAuth, cellController.getCell);

//route to update a single cell by their cell id
router.put('/:_id', cellController.updateCell);

//route to delete a single cell by their cell id
router.delete('/:_id', cellController.deleteCell);

export default router;
