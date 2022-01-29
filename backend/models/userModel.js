const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    // required: true,
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
    default:20000,
    // min: 0
  },
  isAdmin:{
    type: Boolean,
    required:true,
    default:false
  },
  portfolio:{
    type:Object,
    default:{}
  }
});
userSchema.methods.matchPassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
      next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})
let User = mongoose.model('User', userSchema);

module.exports = User;
