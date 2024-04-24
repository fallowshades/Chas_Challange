import mongoose, { Schema, model, models } from 'mongoose';
//believe user ids must be maintained in redux store to not get lost ?
const AccountSchema = new Schema(
  {
    userid: {
      type: Number,
      required: [true, 'The Task title is required '],
      unique: true,
    },
    users: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    balance: {
      type: Number,
    },
    accounts: {
      type: mongoose.Types.ObjectId,
      ref: 'Accounts',
    },
    sessions: {
      type: mongoose.Types.ObjectId,
      ref: 'Sessions',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Account || model('Account', AccountSchema);
