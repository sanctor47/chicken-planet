import Cell from '../models/cell.model';
import * as ChamberServices from './chamber.service';

//get all cells
export const getAllCells = async () => {
  const data = await Cell.find();
  return data;
};

//new Cell
export const newCell = async (body, addedBy, chamber) => {
  console.log(`body: ${body}`);
  console.log(`addedBy: ${addedBy}`);
  console.log(`chamber: ${chamber}`);
  try {
    const TargetChamber = await ChamberServices.getChamber(chamber);
    console.log(`chamber: ${TargetChamber}`);
    if (!TargetChamber)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'Chamber not found',
        data: 'Chamber_NOT_FOUND'
      };
    const CellData = {
      name: body.name,
      area: body.area || 'TBD',
      addedBy: addedBy,
      chamber: chamber
    };
    const data = await Cell.create(CellData);
    const UpdatedChamber = await ChamberServices.addCellToChamber(
      chamber,
      data._id
    );
    // console.log(`chamber: ${UpdatedChamber}`);
    if (!UpdatedChamber)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'chamber not found',
        data: 'chamber_NOT_FOUND'
      };
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//update single cell
export const updateCell = async (_id, body) => {
  const data = await Cell.findByIdAndUpdate(
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

//delete single cell
export const deleteCell = async (id) => {
  await Cell.findByIdAndDelete(id);
  return '';
};

//get single cell
export const getCell = async (id) => {
  const data = await Cell.findById(id);
  return data;
};
