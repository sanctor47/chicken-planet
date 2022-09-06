import express from 'express';
import * as domainController from '../controllers/domain.controller';

const router = express.Router();

//route to get all domains
router.get('', domainController.getAllDomains);

//route to create a new domain
// router.post('',  domainController.newDomain);

//route to get a single domain by their domain id
router.get('/id/:_id', domainController.getDomain);

//route to update a single domain by their domain id
router.put('/id/:_id', domainController.updateDomain);

//route to delete a single domain by their domain id
router.delete('/id/:_id', domainController.deleteDomain);

export default router;
