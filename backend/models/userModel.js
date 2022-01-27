const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    // match: [/^[a-zA-Z\s]*$/]
  },
  email: {
    type: String,
    required: true,
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    required: true
  },
  wallet: {
    type: Number,
    required: true,
    min: 0
  },
  isAdmin:{
    type: Boolean,
    required:true,
    default:false
  }
});

let User = mongoose.model('User', userSchema);

module.exports = User;
