import Device from '../models/device.model';
import Crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import * as SensorServices from './sensor.service';


function randomString(size = 21) {
  return Crypto.randomBytes(size).toString('base64').slice(0, size);
}

//get all devices
export const getAllDevices = async () => {
  const data = await Device.find();
  return data;
};

//create new device
export const newDevice = async (body, addedBy, domain) => {
  try {
    const DeviceCheck = await Device.findOne({ name: body.name });
    if (DeviceCheck && DeviceCheck.domain === body.domain) {
      throw {
        code: HttpStatus.CONFLICT,
        message: `Device ${body.name} already exists`
      };
    }
    const newDevice = {
      UUID: uuidv4(),
      name: body.name,
      label: body.label,
      addedBy: addedBy,
      domain: domain,
      device_key: randomString()
    };
    const data = await Device.create(newDevice);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//update single device
export const updateDevice = async (_id, body) => {
  const data = await Device.findByIdAndUpdate(
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

//delete single device
export const deleteDevice = async (id) => {
  await Device.findByIdAndDelete(id);
  return '';
};

//get single device
export const getDevice = async (id) => {
  const data = await Device.findById(id);
  return data;
};



const addSensorToDeviceArray = async (data, id) => {
  console.log(`Adding sensor ${data} to device ${id}`);
  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      id,
      { $push: { sesnors: { UUID: data } } },
      { new: true }
    );
    return updatedDevice;
  } catch (error) {
    console.error(error);
  }
};

export const sync = async (body, id) => {
  try {
    // console.log(body);
    const { sensors, actuators } = body;
    const TargetDevice = await Device.findById(id);
    if (!TargetDevice)
      throw { code: 401, data: 'Fuck you', message: 'Device not found' };
    console.log('Device: UUID: ' + TargetDevice.uuid);
    let currentDeviceSensors = TargetDevice.sensors;
    let currentDeviceActuators = TargetDevice.actuators;
    console.log('Current device Sensors: ' + currentDeviceSensors.length);
    console.log('Current device Actuators: ' + currentDeviceActuators.length);
    let updatedDeviceSensors = [];
    let updatedDeviceActuators = [];

    //Update device Array with
    console.log('Clearing device Array');

    for (let i = 0; i < sensors.length; i++) {
      // console.log('Sensor: ' + JSON.stringify(sensors[i]));
      const SensorData = {
        name: sensors[i].name,
        UUID: sensors[i].UUID,
        node: id,
        reading: {
          key: sensors[i].reading.key,
          typeof: sensors[i].reading.typeof,
          unit: sensors[i].reading.unit
        }
      };

      if (
        !currentDeviceSensors.filter((e) => e.UUID === SensorData.UUID).length >
        0
      ) {
        console.log(`Sensor Not Found at Device: ${SensorData.UUID}`);
        const existingSensor = await SensorServices.getSensorByUUID(
          SensorData.UUID
        );
        if (existingSensor) {
          console.log(`Sensor Is on the Newwork: ${SensorData.UUID}`);
          if (!existingSensor.node === id) {
            console.log(
              `Sensor ${existingSensor.UUID} is not Connected to Device ${id}`
            );
            const updatedSensor = SensorServices.updateSesnorNode(
              existingSensor._id,
              id
            );
            // Update existingSensor.node with id
            if (!updatedSensor) {
              throw {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Failed to update existing sensor`
              };
            }
            updatedDeviceSensors.push({ UUID: SensorData.UUID });
            await addSensorToDeviceArray(SensorData.UUID, id);
          } else {
            console.log(
              `Sensor ${SensorData.UUID} is Connected to Device ${id}`
            );
            //Push SensorData to device sensor[]
            updatedDeviceSensors.push({ UUID: SensorData.UUID });
            await addSensorToDeviceArray(SensorData.UUID, id);
          }
        } else {
          const newSensor = await SensorServices.addNewSensor(SensorData);
          if (!newSensor)
            throw {
              code: HttpStatus.BAD_REQUEST,
              message: 'Failed to add new sensor'
            };
          updatedDeviceSensors.push({ UUID: SensorData.UUID });
          await addSensorToDeviceArray(SensorData.UUID, id);
        }
      } else {
        const existingSensor = await SensorServices.getSensorByUUID(
          SensorData.UUID
        );
        if (existingSensor.node !== id) {
          const updatedSensor = SensorServices.updateSesnorNode(
            existingSensor._id,
            id
          );
          // Update existingSensor.node with id
          if (!updatedSensor) {
            throw {
              code: HttpStatus.INTERNAL_SERVER_ERROR,
              message: `Failed to update existing sensor`
            };
          }
          updatedDeviceSensors.push({ UUID: SensorData.UUID });
          await addSensorToDeviceArray(SensorData.UUID, id);
        } else {
          updatedDeviceSensors.push({ UUID: SensorData.UUID });
          await addSensorToDeviceArray(SensorData.UUID, id);
        }
      }
    }
    console.log(updatedDeviceSensors);

    await Device.findOneAndUpdate(
      { uuid: TargetDevice.uuid },
      { sesnors: [] },
      { new: true }
    );

    await Device.findByIdAndUpdate(
      id,
      { sensors: updatedDeviceSensors },
      { new: true }
    );

    const UpdatedDevice3 = await Device.findByIdAndUpdate(
      id,
      { actuators: [] },
      { new: true }
    );

    updatedDeviceActuators = [
      { UUID: '8998989898989' },
      { UUID: '47364384275' }
    ];
    console.log(`Updated deviceActuators: ${updatedDeviceActuators}`);

    const UpdatedDevice2 = await Device.findByIdAndUpdate(
      id,
      { actuators: updatedDeviceActuators },
      { new: true }
    );

    // const UpdatedDevice2 = await Device.findOneAndUpdate(
    //   { uuid: TargetDevice.uuid },
    //   { $addToSet: { actuators: { UUID: '29730925709327' } } },
    //   { new: true }
    // );
  } catch (errors) {
    console.log(errors);
    throw errors;
  }
};


//Login device
export const login = async (body) => {
  try {
    const device = await Device.findOne({ uuid: body.uuid }, '-__v -updatedAt');
    if (!device)
      throw {
        code: 404,
        data: 'NO_uuid_FOUND',
        message: 'This uuid is not registered.'
      };

    if (body.device_key === device.device_key) {
      const token = jwt.sign(
        { device_id: device._id, uuid: device.uuid },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h'
        }
      );

      device.token = token;

      return device;
    } else {
      throw {
        code: 404,
        data: 'DEVICE_KEY_MISSMATCH',
        message: 'Wrong Device Key'
      };
    }
  } catch (error) {
    throw error;
  }
};
