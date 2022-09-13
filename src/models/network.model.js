import { Schema, model } from 'mongoose';

const networkSchema = new Schema(
  {
    name: {type: String},
    gateway:{type: Schema.Types.ObjectId, ref:"Device"},
    nodes:[{type: Schema.Types.ObjectId, ref:"Device"}]
  },
  {
    timestamps: true
  }
);

export default model('Network', networkSchema);
