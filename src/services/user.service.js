import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as DomainService from '../services/domain.service';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

//Signup New User
export const signup = async (body) => {
  try {
    const { firstName, lastName, phone, password } = body;
    const UserByPhone = await User.findOne({ phone: phone });
    if (UserByPhone) {
      throw {
        code: '403',
        message: 'Phone Number Alredy Regestered',
        data: 'PHONE_ALREDY_REGESTERED'
      };
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userData = {
      firstName,
      lastName,
      phone,
      password: encryptedPassword
    };
    const data = await User.create(userData);
    const domainData = {
      name: `${firstName} ${lastName} - Domain`,
      owner: data._id
    };
    const domain = await DomainService.newDomain(domainData);
    const updatedUser = await User.findByIdAndUpdate(
      data._id,
      { domain: domain._id },
      { new: true }
    );
    return updateUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Login New User
export const login = async (body) => {
  const { phone, password } = body;
  try {
    const UserByphone = await User.findOne({ phone: phone });
    if (!UserByphone) {
      throw {
        code: '404',
        message: 'User not found',
        data: 'USER_NOT_FOUND'
      };
    }
    if (!(await bcrypt.compare(password, UserByphone.password))) {
      throw {
        code: '401',
        message: 'User not found',
        data: 'USER_NOT_FOUND'
      };
    }
    const token = jwt.sign(
      { _id: UserByphone._id, phone, domain: UserByphone.domain },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h'
      }
    );
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
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

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
