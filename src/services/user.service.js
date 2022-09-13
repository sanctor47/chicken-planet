import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import * as DomainService from '../services/domain.service';

//get all users
export const getAllUsers = async () => {
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
    const duplicateUser = User.findOne({ phone: phone });
    if (duplicateUser)
      throw {
        code: HttpStatus.CONFLICT,
        message: 'Phone number alredy exists.'
      };
    const newUser = User.create({ phone: phone, OTP: '1234' });
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verfiyOTP = async (body) => {
  try {
    const { OTP } = body;
    if (!OTP)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'OTP not found'
      };
    const foundUser = await User.findOne({ OTP: OTP });
    if (!foundUser)
      throw {
        code: HttpStatus.NOT_FOUND,
        message: ' invalid OTP'
      };
    const domainData = {
      name: `${foundUser.phone} - Domain`,
      owner: foundUser._id
    };
    const domain = await DomainService.newDomain(domainData);
    const updatedUser = await User.findByIdAndUpdate(
      foundUser._id,
      { domain: domain._id },
      { new: true }
    );
    const token = jwt.sign(
      { _id: foundUser._id, domain: domain._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: '100h'
      }
    );
    return {
      userToken: token
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
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

//Signup New User
// export const signup = async (body) => {
//   try {
//     const { firstName, lastName, phone, password } = body;
//     const UserByPhone = await User.findOne({ phone: phone });
//     if (UserByPhone) {
//       throw {
//         code: '403',
//         message: 'Phone Number Alredy Regestered',
//         data: 'PHONE_ALREDY_REGESTERED'
//       };
//     }
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     const userData = {
//       firstName,
//       lastName,
//       phone,
//       password: encryptedPassword
//     };
//     const data = await User.create(userData);
//     const domainData = {
//       name: `${firstName} ${lastName} - Domain`,
//       owner: data._id
//     };
//     const domain = await DomainService.newDomain(domainData);
//     const updatedUser = await User.findByIdAndUpdate(
//       data._id,
//       { domain: domain._id },
//       { new: true }
//     );
//     return updateUser;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

//Login New User
// export const login = async (body) => {
//   const { phone, password } = body;
//   try {
//     const UserByphone = await User.findOne({ phone: phone });
//     if (!UserByphone) {
//       throw {
//         code: '404',
//         message: 'User not found',
//         data: 'USER_NOT_FOUND'
//       };
//     }
//     if (!(await bcrypt.compare(password, UserByphone.password))) {
//       throw {
//         code: '401',
//         message: 'User not found',
//         data: 'USER_NOT_FOUND'
//       };
//     }
// const token = jwt.sign(
//   { _id: UserByphone._id, phone, domain: UserByphone.domain },
//   process.env.TOKEN_KEY,
//   {
//     expiresIn: '2h'
//   }
// );
//     return token;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

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
