import express from 'express';
import * as actuatorController from '../controllers/actuator.controller';

const router = express.Router();

//route to get all actuators
router.get('', actuatorController.getAllActuators);

//route to create a new actuator
router.post('', actuatorController.newActuator);

//route to get a single actuator by their actuator id
router.get('/:_id', actuatorController.getActuator);

//route to update a single actuator by their actuator id
router.put('/:_id', actuatorController.updateActuator);

//route to delete a single actuator by their actuator id
router.delete('/:_id', actuatorController.deleteActuator);

export default router;
