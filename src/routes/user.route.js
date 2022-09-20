import express from 'express';
import * as userController from '../controllers/user.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//GET All users (Pagination, Params)
router.get('', userAuth, userController.getAllUsers);
//GET user by Id Done [Done]
router.get('/id/:_id', userAuth, userController.getUser);
//POST On Boarding Process Start Register Phone Number and Send OTP [Done for Testing] [OTP is Static]
router.post('/newUser', userController.newUser);
//POST Verfiy OTP and Create Domain and Send JWT Token [Done for Testing] [OTP remains in db and is used for later login]
router.post('/verfiyOTP', userController.verfiyOTP);
//POST On Boarding Process Add User Data = [First Name, Last Name, Email] [Done]
router.put('/userInfo', userAuth, userController.updateUserInfo);
//DELETE USER by Id [Done]
router.delete('/id/:_id', userAuth, userController.deleteUser);
//GET User data by token
router.get('/current', userAuth, userController.getCurrentUser);
//POST Login User by Phone
// router.post('/login', userController.login);
//POST Refresh User Token
router.post('/refresh', userController.refreshToken);

export default router;
