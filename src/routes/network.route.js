import express from 'express';
import * as networkController from '../controllers/network.controller';

const router = express.Router();

//route to get all networks
router.get('', networkController.getAllNetworks);

//route to create a new network
router.post('', networkController.newNetwork);

//route to get a single network by their network id
router.get('/id/:_id', networkController.getNetwork);

//route to update a single network by their network id
router.put('/id/:_id', networkController.updateNetwork);

//route to delete a single network by their network id
router.delete('/id/:_id', networkController.deleteNetwork);

export default router;
