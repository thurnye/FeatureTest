var mongoose = require('mongoose');
const {Schema} = mongoose


const userSchema = new Schema({
    
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String},
  googleId: String,
},
   
{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);