import express from 'express';
const router = express.Router();

import readingRoute from './reading.route';
import networkRoute from './network.route';
import actuatorRoute from './actuator.route';
import bucketRoute from './bucket.route';
import sensorRoute from './sensor.route';
import deviceRoute from './device.route';
import chamberRoute from './chamber.route';
import adminRoute from './admin.route';
import cellRoute from './cell.route';
import domainRoute from './domain.route';
import userRoute from './user.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/domains', domainRoute);
  router.use('/cells', cellRoute);
  router.use('/chambers', chamberRoute);
  router.use('/admins', adminRoute);
  router.use('/devices', deviceRoute);
  router.use('/sensors', sensorRoute);
  router.use('/actuators', actuatorRoute);
  router.use('/buckets', bucketRoute);
  router.use('/networks', networkRoute);
  router.use('/reading', readingRoute);
  return router;
};

export default routes;
