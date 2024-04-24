import { Schema, model, models } from 'mongoose';

const TravelSchema = new Schema(
  {
    trip: {
      //round-trip, one-way, multi-city
      type: String,
      required: [true, 'The Task title is required '],
      unique: true,
      trim: true,
      maxlength: [40, 'title cannot be grater than 40 characters'],
    },
    typeOfAttraction: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'title cannot be grater than 200 characters'],
    },
    vehicle: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Travel || model('Travel', TaskSchema);
