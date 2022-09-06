import express from 'express';
import * as bucketController from '../controllers/bucket.controller';


const router = express.Router();

//route to get all buckets
router.get('', bucketController.getAllBuckets);

//route to create a new bucket
router.post('',  bucketController.newBucket);

//route to get a single bucket by their bucket id
router.get('/:_id',  bucketController.getBucket);

//route to update a single bucket by their bucket id
router.put('/:_id', bucketController.updateBucket);

//route to delete a single bucket by their bucket id
router.delete('/:_id', bucketController.deleteBucket);

export default router;
