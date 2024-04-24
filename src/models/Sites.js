import { Schema, model, models } from 'mongoose';

const SitesSchema = new Schema(
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Sites || model('Sites', SitesSchema);
