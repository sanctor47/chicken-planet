import Network from '../models/network.model';

//get all networks
export const getAllNetworks = async () => {
  const data = await Network.find();
  return data;
};

//create new network
export const newNetwork = async (body) => {
  try {
    const NewNetwork = {
      name: body.name,
      gateway: body.gateway,
      nodes: body.nodes
    }
    const data = await Network.create(NewNetwork);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//update single network
export const updateNetwork = async (_id, body) => {
  const data = await Network.findByIdAndUpdate(
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

//delete single network
export const deleteNetwork = async (id) => {
  await Network.findByIdAndDelete(id);
  return '';
};

//get single network
export const getNetwork = async (id) => {
  const data = await Network.findById(id);
  return data;
};
