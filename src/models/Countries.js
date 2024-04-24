import { Schema, model, models } from 'mongoose';
import { number } from 'zod';

//inspiration
//https://www.booking.com/flights/index.html
//https://www.momondo.se/?ispredir=true
//https://www.trip.com/flights/
const CountriesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The Task title is required '],
      unique: true,
      trim: true,
      maxlength: [40, 'title cannot be grater than 40 characters'],
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'title cannot be grater than 200 characters'],
    },
    cost: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model('Countries', CountriesSchema);
