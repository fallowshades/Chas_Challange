import { Schema, model, models } from 'mongoose';

const SessionSchema = new Schema(
  {
    // _id: {
    //   type: String,
    //   required: [true, 'The Task title is required '],
    //   unique: true,
    //   trim: true,
    //   maxlength: [40, 'title cannot be grater than 40 characters'],
    // },
    token: {
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

SessionSchema.methods.generateToken = function (payload) {
  //payload = id: this._id (but the model does not know what this.id is since the object was not created)
  return jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export default models.Session || model('Session', SessionSchema);
