import Reading from '../models/reading.model';
import Device from '../models/device.model';
import Sensor from '../models/sensor.model';
import HttpStatus from 'http-status-codes';
import { getAllSensors } from './sensor.service';
import { v4 as uuidv4 } from 'uuid';

//get all readings
export const getAllReadings = async () => {
  const data = await Reading.find();
  return data;
};


// export const getAllTempReadingsForDevice = async (sensorId, Limit, skip) => {
//   try {
//     const limit = parseInt(Limit)
//     const offset = parseInt(skip)
//     const TargetSensor = await Sensor.findOne({ UUID: sensorId })
//     const data = await Reading.find({ sensor: TargetSensor._id })
//       .skip(offset)
//       .limit(limit)
//     const tradesCollectionCount = await data.count()
//     const totalPages = Math.ceil(tradesCollectionCount / limit)
//     const currentPage = Math.ceil(tradesCollectionCount % offset)
//     return {
//       data: data,
//       paging: {
//         total: tradesCollectionCount,
//         page: currentPage,
//         pages: totalPages,
//       },
//     }

//   } catch (error) {
//     console.error(error);
//   }
// }

export const getAllDeviceReadingsById = async (id) => {
  try {
    const resData = {
      tempPoints: [],
      humPoints: [],
      ammoniaPoints: [],
    }
    console.log(id);
    const TargetDevice = await Device.findById(id);
    for (let index = 0; index < TargetDevice.sensors.length; index++) {
      const element = TargetDevice.sensors[index];
      const TargetSensor = await Sensor.findOne({ UUID: element.UUID });
      const TargetSensorReadings = await Reading.find({ sensor: TargetSensor._id })
      if (TargetSensorReadings[0].key === "Temprature") {
        resData.tempPoints.push(TargetSensorReadings)
      }
      if (TargetSensorReadings[0].key === "Humidity") {
        resData.humPoints.push(TargetSensorReadings)
      }
      if (TargetSensorReadings[0].key === "Ammonia") {
        resData.ammoniaPoints.push(TargetSensorReadings)
      }
    }
    return resData
  } catch (error) {
    throw error
  }
}

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
    const readingUUID = uuidv4();
    const tempReading = await Reading.create({
      sensor: tempSensor._id,
      key: 'Temprature',
      point: temp.data.temperature,
      UUID: readingUUID
    });
    const humReading = await Reading.create({
      sensor: humSensor._id,
      key: 'Humidity',
      point: humidity.data.humidity,
      UUID: readingUUID
    });
    const ammoniaReading = await Reading.create({
      sensor: ammoniaSensor._id,
      key: 'Ammonia',
      point: ammonia.data.ammonia,
      UUID: readingUUID
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

export const getLatestReadingByDeviceId = async (id) => {
  try {
    // console.log(id);
    const resData = []
    // const deviceId = id;
    const TargetDevice = await Device.findById(id);
    // console.log(TargetDevice);
    // const sensors = [];
    for (let index = 0; index < TargetDevice.sensors.length; index++) {
      const element = TargetDevice.sensors[index];
      const targetSensor = await Sensor.findOne({ UUID: element.UUID })
      // console.log(targetSensor);
      const LatestReading = await Reading.findOne({ sensor: targetSensor._id }).sort({createdAt: -1})
      // console.log(LatestReading);
      resData.push(LatestReading)
    }
    console.log(resData)
    return resData;
  } catch (e) {
    // res.status(500)
    console.error(e)
    throw e
  }

};

