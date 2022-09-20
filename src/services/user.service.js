import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import * as DomainService from '../services/domain.service';

//get all users
export const getAllUsers = async (params) => {
  try {
    const data = await User.find();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//create new user
export const newUser = async (body) => {
  try {
    const { phone } = body;
    if (!phone)
      throw {
        code: HttpStatus.PARTIAL_CONTENT,
        message: 'Please enter a phone number.'
      };
    console.log('Phone number: ' + phone);
    const duplicateUser = User.findOne({ phone: phone });
    if (duplicateUser) {
      console.log('Creating new user');
      const newUser = User.create({ phone: phone, OTP: '1234' });
      return newUser;
    }
    console.log(duplicateUser);
    throw {
      code: HttpStatus.CONFLICT,
      message: 'Phone number alredy exists.'
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verfiyOTP = async (body) => {
  try {
    const { OTP, phone } = body;
    if (!OTP)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'OTP not found'
      };
    if (!phone)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'phone not found'
      };
    const foundUser = await User.findOne({ phone: phone });
    if (!foundUser)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'Phone Number not found'
      };
    if (foundUser.OTP !== OTP)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'Invalid OTP'
      };
    const domainData = {
      name: `${foundUser.phone} - Domain`,
      owner: foundUser._id
    };
    const domain = await DomainService.newDomain(domainData);
    const refreshToken = jwt.sign(
      { _id: foundUser._id, domain: domain._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '100h'
      }
    );
    const token = jwt.sign(
      { _id: foundUser._id, domain: domain._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '10h'
      }
    );
    const updatedUser = await User.findByIdAndUpdate(
      foundUser._id,
      { domain: domain._id, refreshToken: refreshToken },
      { new: true }
    );
    return {
      userToken: token,
      refreshToken: refreshToken
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const RefreshToken = async (bearerToken) => {
  try {
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Refersh token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { _id, phone, domain } = await jwt.verify(
      bearerToken,
      process.env.TOKEN_KEY
    );

    const foundUser = await User.findById(_id);
    if (!foundUser) {
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'User not found.'
      };
    }
    if(foundUser.refreshToken !== bearerToken){
      throw{
        code: HttpStatus.NOT_FOUND,
        message: 'Refresh token not found.'
      }
    }
    const newRefreshToken = jwt.sign(
      { _id: foundUser._id, domain: domain._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '100h'
      }
    );
    const token = jwt.sign(
      { _id: foundUser._id, domain: domain._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '10h'
      }
    );
    const updatedUser = await User.findByIdAndUpdate(
      foundUser._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    return {
      userToken: token,
      refreshToken: newRefreshToken
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//update single user
export const updateUserInfo = async (_id, body) => {
  console.log(_id);
  try {
    const { firstName, lastName, email } = body;
    const data = await User.findByIdAndUpdate(
      { _id },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        completedProfile: true
      },
      { new: true }
    );
    const domainUpdate = DomainService.updateDomainName(
      data.domain,
      `${data.firstName} ${data.lastName} - Domain`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
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

export const updateProfile = async (body, id) => {
  try {
    const { firstName, lastName, email } = body;
    const data = {
      firstName: firstName ? firstName : null,
      lastName: lastName ? lastName : null,
      email: email ? email : null
    };
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (updatedUser.firstName && updatedUser.lastName && updatedUser.email) {
      const completedProfileUser = await User.findByIdAndUpdate(id, data, {
        new: true
      });
      return completedProfileUser;
    }
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async (body) => {
  try {
    const { phone } = body;
    if (!phone)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Phone number is required'
      };
    const TargetUser = User.findOne({ phone: phone });
    if (!TargetUser) {
      throw {
        code: HttpStatus.NOT_FOUND,
        message: 'User does not exist'
      };
      return;
    }

    const token = jwt.sign(
      { _id: TargetUser._id, domain: TargetUser.domain },
      process.env.TOKEN_KEY,
      {
        expiresIn: '100h'
      }
    );

    return { userToken: token };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
