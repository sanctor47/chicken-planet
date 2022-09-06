import express from 'express';
import * as sensorController from '../controllers/sensor.controller';

const router = express.Router();

//route to get all sensors
router.get('', sensorController.getAllSensors);

//route to create a new sensor
router.post('', sensorController.newSensor);

//route to get a single sensor by their sensor id
router.get('/:_id', sensorController.getSensor);

//route to update a single sensor by their sensor id
router.put('/:_id', sensorController.updateSensor);

//route to delete a single sensor by their sensor id
router.delete('/:_id', sensorController.deleteSensor);

export default router;
