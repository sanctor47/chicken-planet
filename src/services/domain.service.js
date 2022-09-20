import Domain from '../models/domain.model';

//get all domains
export const getAllDomains = async () => {
  const data = await Domain.find();
  return data;
};

// export const getMyDomain = async (domainId) => {
//   try {
//     const 
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }

// }

//create new domain
export const newDomain = async (body) => {
  try {
    const data = await Domain.create(body);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//update single domain
export const updateDomainName = async (_id, name) => {
  const data = await Domain.findByIdAndUpdate(
    {
      _id
    },
    {name: name},
    {
      new: true
    }
  );
  return data;
};

//update single domain
export const updateDomain = async (_id, body) => {
  const data = await Domain.findByIdAndUpdate(
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

//delete single domain
export const deleteDomain = async (id) => {
  await Domain.findByIdAndDelete(id);
  return '';
};

//get single domain
export const getDomain = async (id) => {
  // console.log('getDomain', id);
  const data = await Domain.findById(id);
  return data;
};

//get single domain
export const addChamberToDomain = async (id, chamber) => {
  // console.log(`Adding ${chamber} to domain ${id}`);
  const data = await Domain.findByIdAndUpdate(
    id,
    { $push: { chambers: chamber } },
    { new: true }
  );
  return data;
};
