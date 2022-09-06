import Chamber from '../models/chamber.model';
import * as DomainServices from './domain.service';
import HttpStatus from 'http-status-codes';

//get all chambers
export const getAllChambers = async () => {
  const data = await Chamber.find().populate('addedBy');
  return data;
};

//create new chamber
export const newChamber = async (body, addedBy, domain) => {
  // console.log(`body: ${body}`);
  // console.log(`addedBy: ${addedBy}`);
  // console.log(`domain: ${domain}`);
  try {
    const TargetDomain = await DomainServices.getDomain(domain);
    console.log(`domain: ${TargetDomain}`);
    if (!TargetDomain)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'Domain not found',
        data: 'DOMAIN_NOT_FOUND'
      };
    const ChamberData = {
      name: body.name,
      area: body.area || 'TBD',
      addedBy: addedBy,
      domain: domain
    };
    const data = await Chamber.create(ChamberData);
    const UpdatedDomain = await DomainServices.addChamberToDomain(
      domain,
      data._id
    );
    // console.log(`domain: ${UpdatedDomain}`);
    if (!UpdatedDomain)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'Domain not found',
        data: 'DOMAIN_NOT_FOUND'
      };
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//update single chamber
export const updateChamber = async (_id, body) => {
  const data = await Chamber.findByIdAndUpdate(
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

//delete single chamber
export const deleteChamber = async (id) => {
  await Chamber.findByIdAndDelete(id);
  return '';
};

//get single chamber
export const getChamber = async (id) => {
  const data = await Chamber.findById(id);
  return data;
};

//get single domain
export const addCellToChamber = async (id, cell) => {
  // console.log(`Adding ${chamber} to domain ${id}`);
  const data = await Domain.findByIdAndUpdate(
    id,
    { $push: { cells: cell } },
    { new: true }
  );
  return data;
};
