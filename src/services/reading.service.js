import Reading from '../models/reading.model';
import Device from '../models/device.model';
import Sensor from '../models/sensor.model';
import HttpStatus from 'http-status-codes';
import { getAllSensors } from './sensor.service';

//get all readings
export const getAllReadings = async () => {
  const data = await Reading.find();
  return data;
};

export const TempNewReading = async (body) => {
  try {
    console.log(body);
    let TargetDevice = null;
    if (body['Gateway_uuid']) {
      {
        console.log('Gateway_uuid: ' + body['Gateway_uuid']);
        TargetDevice = await Device.findOne({ UUID: body['Gateway_uuid'] });
      }
    }
    if (body['Node mac']) {
      console.log('Node mac: ' + body['Node mac']);
      TargetDevice = await Device.findOne({ UUID: body['Node mac'] });
    }
    if (!TargetDevice) {
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'No target device found'
      };
    }
    console.log(TargetDevice);
    const temp = body['Temperature'];
    const ammonia = body['Ammonia'];
    const humidity = body['Humidity'];
    const tempSensor = await Sensor.findOne({ UUID: temp['sensor uuid'] });
    const humSensor = await Sensor.findOne({ UUID: humidity['sensor uuid'] });
    const ammoniaSensor = await Sensor.findOne({
      UUID: ammonia['sensor uuid']
    });
    if (!tempSensor || !humSensor || !ammoniaSensor)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'Sensor not found'
      };
    const tempReading = await Reading.create({
      sensor: tempSensor._id,
      key: 'Temprature',
      point: temp.data.temperature
    });
    const humReading = await Reading.create({
      sensor: humSensor._id,
      key: 'Humidity',
      point: humidity.data.humidity
    });
    const ammoniaReading = await Reading.create({
      sensor: ammoniaSensor._id,
      key: 'Ammonia',
      point: ammonia.data.ammonia
    });
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//create new reading
export const newReading = async (body) => {
  // const data = await Reading.create(body);
  // return data;
  console.log(body);
  try {
    const device = body['node uuid'];
    const temp = body['Temperature'];
    const ammonia = body['Ammonia'];
    const humidity = body['Humidity'];
    const sensor = [temp, humidity, ammonia];
    const TargetDevice = await Device.findOne({ UUID: device });
    if (!TargetDevice)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'Device not found.'
      };
    const tempSensor = await Sensor.findOne({ UUID: temp['sensor uuid'] });
    const humSensor = await Sensor.findOne({ UUID: humidity['sensor uuid'] });
    const ammoniaSensor = await Sensor.findOne({
      UUID: ammonia['sensor uuid']
    });
    if (!tempSensor || !humSensor || !ammoniaSensor)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'Sensor not found'
      };
    const tempReading = await Reading.create({
      sensor: tempSensor._id,
      key: 'Temprature',
      point: temp.data.temperature
    });
    const humReading = await Reading.create({
      sensor: humSensor._id,
      key: 'Humidity',
      point: humidity.data.humidity
    });
    const ammoniaReading = await Reading.create({
      sensor: ammoniaSensor._id,
      key: 'Ammonia',
      point: ammonia.data.ammonia
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

//update single reading
export const updateReading = async (_id, body) => {
  const data = await Reading.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single reading
export const deleteReading = async (id) => {
  await Reading.findByIdAndDelete(id);
  return '';
};

//get single reading
export const getReading = async (id) => {
  const data = await Reading.findById(id);
  return data;
};
