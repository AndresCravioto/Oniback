const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String},
  lastName: {type: String},
  age: {type: Number},
  memes: [{type:Schema.Types.ObjectId, ref:'Meme'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;