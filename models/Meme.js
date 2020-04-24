const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
  image: {type: String, required: true},
  createdBy: {type:Schema.Types.ObjectId, ref:'User', required: true},

//  avatar: { type: String, default: 'https://res.cloudinary.com/drakarzamael/image/upload/v1538631500/user.png' }
//}, {
//  timestamps: {
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
//   }
});

const meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;