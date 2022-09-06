import Sensor from '../models/sensor.model';
import * as BucketService from './bucket.service';

//get all sensors
export const getAllSensors = async () => {
  const data = await Sensor.find();
  return data;
};

export const getSensorByUUID = async (UUID) => {
  try {
    const data = await Sensor.findOne({ UUID });
    return data;
  } catch (error) {
    throw error;
  }
};

// Check if sensor already exists
// -if true, then check if DeviceIds Match
// --if true, then return True
// --if false, update sensor node and add deviceChageLog
// -if false, create a new sensor

//create new sensor
export const newSensor = async (body, id) => {
  const sensorCheck = await Sensor.findOne({ UUID: body.UUID });
  if (sensorCheck) {
    if (sensorCheck.node !== id) {
      await Sensor.findByIdAndUpdate(
        sensorCheck._id,
        {
          node: id
        },
        { new: true }
      );
    }
    return;
  } else {
    return;
  }

  const newSensorData = {
    name: body.name,
    UUID: body.uuid
  };
  const data = await Sensor.create(body);
  return data;
};

//create new sensor
export const addNewSensor = async (data) => {
  try {
    const newSesnorData = {
      name: data.name,
      UUID: data.UUID,
      node: data.node,
      reading: data.reading,
      connected: true
    };
    const newSensor = await Sensor.create(newSesnorData);
    return newSensor;
  } catch (error) {
    console.error(error);
  }
};

export const updateSesnorNode = async (sensorId, deviceId) => {
  try {
    const TargetSensor = await Sensor.findByIdAndUpdate(
      sensorId,
      { node: deviceId },
      { new: true }
    );
    return TargetSensor;
  } catch (errors) {
    console.error(errors);
  }
};

//update single sensor
export const updateSensor = async (_id, body) => {
  const data = await Sensor.findByIdAndUpdate(
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

//delete single sensor
export const deleteSensor = async (id) => {
  await Sensor.findByIdAndDelete(id);
  return '';
};

//get single sensor
export const getSensor = async (id) => {
  const data = await Sensor.findById(id);
  return data;
};

export const newReadings = async (body) => {
  try {
    const { timeStamp, data } = body;
    data.forEach(async (sensor) => {
      const response = await BucketService.newPoint(sensor, timeStamp);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSensorReadings = async (UUID) => {
  try {
    console.log(UUID);
    const TargetSensor = await Sensor.findOne({ UUID });
    if (!TargetSensor)
      throw {
        code: 404,
        message: 'Sensor not found',
        data: 'SENSOR_NOT_FOUND'
      };
    const data = await BucketService.getBucketBySensorUUID(UUID);
    if (!data)
      throw {
        code: 500,
        message: 'Error getting bucket',
        data: 'BUCKET_GET_ERROR'
      };
      return data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
