import Bucket from '../models/bucket.model';

//get all buckets
export const getAllBuckets = async () => {
  const data = await Bucket.find();
  return data;
};

//create new bucket
export const newBucket = async (UUID, key) => {
  try {
    const newBucket = {
      UUID,
      key
    };
    const data = await Bucket.create(newBucket);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//update single bucket
export const updateBucket = async (_id, body) => {
  const data = await Bucket.findByIdAndUpdate(
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

//delete single bucket
export const deleteBucket = async (id) => {
  await Bucket.findByIdAndDelete(id);
  return '';
};

//get single bucket
export const getBucket = async (id) => {
  const data = await Bucket.findById(id);
  return data;
};

export const newPoint = async (data, timeStamp) => {
  try {
    const { UUID, point } = data;
    const SensorBucket = await Bucket.findOne({ UUID });
    if (!SensorBucket) {
      const createdBucket = await newBucket(UUID, point.key);
      if (!createdBucket)
        throw {
          code: 500,
          message: 'Error creating new bucket'
        };
      await Bucket.findByIdAndUpdate(
        createdBucket._id,
        {
          $push: { points: { timeStamp, point } }
        },
        { safe: true, upsert: true }
      );
    } else {
      await Bucket.findByIdAndUpdate(
        SensorBucket._id,
        {
          $push: { points: { timeStamp, point } }
        },
        { safe: true, upsert: true }
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const newReading = async (body) => {
  try {
    const timeStamp = body.timeStamp;
    const data = body.data;
    // console.log(data[0])
    data.forEach(async (element) => {
      console.log(element.UUID);
      console.log(element.point);
      const buckets = await Bucket.find({ sensor: element.UUID });
      let TargetBucket;
      if (buckets.length === 0) {
        TargetBucket = await newBucket(element.UUID, element.point.key);
      } else {
        TargetBucket = buckets[0];
      }
      const point = {
        timeStamp,
        point: element.point
      };
      await Bucket.findByIdAndUpdate(
        TargetBucket._id,
        { $push: { points: point } },
        { safe: true, upsert: true }
      );
    });
  } catch (errors) {
    console.log(errors);
  }
};

export const getBucketBySensorUUID = async (UUID) => {
  try {
    console.log(UUID);
    const data = await Bucket.findOne({ UUID});
    // console.log(Bucket);
    return data;
  } catch (errors) {
    console.log(errors);
  }
};
