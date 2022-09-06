import express from 'express';
import * as deviceController from '../controllers/device.controller';
import { deviceAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all devices
router.get('', deviceController.getAllDevices);

//route to create a new device
router.post('',  deviceController.newDevice);

//route to get a single device by their device id
router.get('/:_id', deviceAuth, deviceController.getDevice);

//route to update a single device by their device id
router.put('/:_id', deviceController.updateDevice);

//route to delete a single device by their device id
router.delete('/:_id', deviceController.deleteDevice);

export default router;
