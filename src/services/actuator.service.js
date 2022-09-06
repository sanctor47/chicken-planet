import Actuator from '../models/actuator.model';

//get all actuators
export const getAllActuators = async () => {
  const data = await Actuator.find();
  return data;
};

//create new actuator
export const newActuator = async (body) => {
  const data = await Actuator.create(body);
  return data;
};

//update single actuator
export const updateActuator = async (_id, body) => {
  const data = await Actuator.findByIdAndUpdate(
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

//delete single actuator
export const deleteActuator = async (id) => {
  await Actuator.findByIdAndDelete(id);
  return '';
};

//get single actuator
export const getActuator = async (id) => {
  const data = await Actuator.findById(id);
  return data;
};
