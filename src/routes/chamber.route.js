import express from 'express';
import * as chamberController from '../controllers/chamber.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all chambers
router.get('', userAuth,chamberController.getAllChambers);

//route to create a new chamber
router.post('',  userAuth,chamberController.newChamber);

//route to get a single chamber by their chamber id
router.get('/:_id', userAuth, chamberController.getChamber);

//route to update a single chamber by their chamber id
router.put('/:_id', chamberController.updateChamber);

//route to delete a single chamber by their chamber id
router.delete('/:_id', chamberController.deleteChamber);

export default router;
