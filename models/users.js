const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*creating a user schema
here we are basically saying to server how a user look like
keywords and their types*/
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    /*here we are saying that email should be a string type,
     and that it should be unique, otherwise wont be possible to create a new user*/
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    transaction: [{
      title: { type: String },
      amount: { type: Number },
      date: { type: String },
    }]
  },
  {
    timestamps: true,
  },
  { typeKey: '$type' }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;