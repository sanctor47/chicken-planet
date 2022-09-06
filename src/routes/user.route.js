import express from 'express';
import * as userController from '../controllers/user.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userAuth, userController.getAllUsers);

//route to create a new user
router.post('', userController.newUser);

//route to get a single user by their user id
router.get('/id/:_id', userAuth, userController.getUser);
router.get('/current', userAuth, userController.getCurrentUser);

//route to signup a new user
router.post('/signup', userController.signup);

//route to login a user
router.post('/login', userController.login);

//route to update a single user by their user id
router.put('/id/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/id/:_id', userController.deleteUser);

export default router;
