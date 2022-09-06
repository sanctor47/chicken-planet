import Admin from '../models/admin.model';

//get all admins
export const getAllAdmins = async () => {
  const data = await Admin.find();
  return data;
};

//create new admin
export const newAdmin = async (body) => {
  const data = await Admin.create(body);
  return data;
};

//update single admin
export const updateAdmin = async (_id, body) => {
  const data = await Admin.findByIdAndUpdate(
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

//delete single admin
export const deleteAdmin = async (id) => {
  await Admin.findByIdAndDelete(id);
  return '';
};

//get single admin
export const getAdmin = async (id) => {
  const data = await Admin.findById(id);
  return data;
};
