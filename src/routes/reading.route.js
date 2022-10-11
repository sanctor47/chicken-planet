import express from 'express';
import * as readingController from '../controllers/reading.controller';
import Readings from '../models/reading.model';
import Networks from '../models/network.model';
import Devices from '../models/device.model';
import Sensors from '../models/sensor.model';
import HttpStatus from 'http-status-codes';

const router = express.Router();

//route to get all readings
router.get('', readingController.getAllReadings);

//route to create a new reading
router.post('', readingController.newReading);

//route to get a single reading by their reading id
router.get('/id/:_id', readingController.getReading);

//route to update a single reading by their reading id
router.put('/id/:_id', readingController.updateReading);

//route to delete a single reading by their reading id
router.delete('/id/:_id', readingController.deleteReading);

router.get('/temp', async (req, res, next) => {
  try {
    const data = await Readings.find({ key: 'Temprature' });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/hum', async (req, res, next) => {
  try {
    const data = await Readings.find({ key: 'Humidity' });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/nh3', async (req, res, next) => {
  try {
    const data = await Readings.find({ key: 'Ammonia' });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/latest/temp', async (req, res, next) => {
  try {
    const data = await Readings.findOne(
      { key: 'Temprature' },
      {},
      { sort: { createdAt: -1 } }
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/latest/hum', async (req, res, next) => {
  try {
    const data = await Readings.findOne(
      { key: 'Humidity' },
      {},
      { sort: { createdAt: -1 } }
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/latest/nh3', async (req, res, next) => {
  try {
    const data = await Readings.findOne(
      { key: 'Ammonia' },
      {},
      { sort: { createdAt: -1 } }
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/latest', async (req, res, next) => {
  try {
    const temp = await Readings.findOne(
      { key: 'Temprature' },
      {},
      { sort: { createdAt: -1 } }
    );
    const hum = await Readings.findOne(
      { key: 'Humidity' },
      {},
      { sort: { createdAt: -1 } }
    );
    const nh3 = await Readings.findOne(
      { key: 'Ammonia' },
      {},
      { sort: { createdAt: -1 } }
    );
    res.status(200).json({ temp, hum, nh3 });
  } catch (error) {
    console.log(error);
  }
});

const arrayAvg = (array)=>{
    let sum = 0;
    let avg = 0;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        sum = parseInt(element) + sum
    }
    avg = sum/array.length
    return Number(avg).toFixed(2);
}

const getAvgReadings = async (gateway, nodes) => {
  var temps = [];
  var hums = [];
  var nh3s = [];

  //   temps.push("20")

  const TargetGateway = await Devices.findById(gateway);
  for (let index = 0; index < TargetGateway.sensors.length; index++) {
    const n = TargetGateway.sensors[index];
    const TargetSensor = await Sensors.findOne({ UUID: n.UUID });
    const TargetReadigns = await Readings.find({ sensor: TargetSensor._id });
    for (let index = 0; index < 10; index++) {
      const element = TargetReadigns[index];
      if (element.key === 'Temprature') temps.push(element.point);
      if (element.key === 'Humidity') hums.push(element.point);
      if (element.key === 'Ammonia') nh3s.push(element.point);
    //   if (element.key === 'Temprature') console.log('Temp: ', element.point);
    //   if (element.key === 'Humidity') console.log('Hum: ', element.point);
    //   if (element.key === 'Ammonia') console.log('Nh3: ', element.point);
    }
  }

  for (let index = 0; index < nodes.length; index++) {
    const elemnet = nodes[index];
    const node = await Devices.findById(elemnet);
    for (let index = 0; index < node.sensors.length; index++) {
      const n = node.sensors[index];
      const TargetSensor = await Sensors.findOne({ UUID: n.UUID });
      const TargetReadigns = await Readings.find({ sensor: TargetSensor._id });
      for (let index = 0; index < TargetReadigns.length; index++) {
        const element = TargetReadigns[index];
        if (element.key === 'Temprature') temps.push(element.point);
        if (element.key === 'Humidity') hums.push(element.point);
        if (element.key === 'Ammonia') nh3s.push(element.point);
        if (element.key === 'Temprature') console.log('Temp: ', element.point);
        if (element.key === 'Humidity') console.log('Hum: ', element.point);
        if (element.key === 'Ammonia') console.log('Nh3: ', element.point);
      }
    }
  }

  const tempAvg = arrayAvg(temps);
  const humAvg = arrayAvg(hums);
  const nh3Avg = arrayAvg(nh3s);

  console.log(tempAvg);
  console.log(humAvg);
  console.log(nh3Avg);
  return {
    tempAvg,
    humAvg,
    nh3Avg
  };
};

router.get('/', async(req, res, next) => {
  try{

  }catch (error) {
    throw err;
  }
})

router.get('/networkId/:networkId', async (req, res, next) => {
  try {
    const TargetNework = await Networks.findById(req.params.networkId);
    if (!TargetNework)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'Network not found.'
      };
    //   console.log(TargetNework.gateway);
    //   console.log(TargetNework.nodes);
    const avgs = await getAvgReadings(TargetNework.gateway, TargetNework.nodes);
    // console.log(avgs);
    res.status(200).send({ data: avgs });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error' });
  }
});

export default router;
