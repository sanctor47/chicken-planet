import express from 'express';
import * as deviceController from '../controllers/device.controller';
import { deviceAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all devices
router.get('', deviceController.getAllDevices);

//route to create a new device
router.post('', deviceController.newDevice);

//route to get a single device by their device id
router.get('/id/:_id',  deviceController.getDevice);

//route to update a single device by their device id
router.put('/id/:_id', deviceController.updateDevice);

//route to delete a single device by their device id
router.delete('/id/:_id', deviceController.deleteDevice);

router.post('/fakeLogin', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ data: '38239gf3298f923g0f32g823' });
});

router.post('/fakeSync', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ data: 'Ok' });
});

router.post('/fakeReading', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ data: 'Ok' });
});

export default router;
