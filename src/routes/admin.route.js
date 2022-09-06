import express from 'express';
import * as adminController from '../controllers/admin.controller';
import { adminAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all admins
router.get('', adminAuth, adminController.getAllAdmins);

//route to create a new admin
router.post('', adminAuth, adminController.newAdmin);

//route to get a single admin by their admin id
router.get('/:_id', adminAuth, adminController.getAdmin);

//route to update a single admin by their admin id
router.put('/:_id', adminAuth, adminController.updateAdmin);

//route to delete a single admin by their admin id
router.delete('/:_id', adminAuth, adminController.deleteAdmin);

export default router;
