const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:  {
        type: String,
        unique: true,
      },
    password: {
        type: String,
      },
    email: {
        type: String,
        unique: true,

      },
    mobile: {
        type: String,
        unique: true,

      },
    wechat: {
        type: String,
        unique: true,

      },
    qq: {
        type: String,
        unique: true,

      },
    isBanned: { type: Boolean, default: false },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
}, { id: true });

UserSchema.statics.auth = async function(authParams, type){
    const { username ,password } = authParams;
    switch (type) {
        case "password":
            if(!authParams.password){
              return "PASSWORD_REQUIRED";
            }
            const user = await this.findOne({$or: [
              {username},
              {email:username},
              {mobile:username}
            ]})

            if(!user){
              return "USER_NOT_FOUND";
            }
           

            const bcrypt = require('bcrypt');
            const authed = bcrypt.compareSync(password, user.password); // true
            if(!authed){
              return "PASSWORD_WRONG";
            }
            return user;

        case "mobile":
            return "MOBILE"
    
        default:
            return "UNKNOWN_TYPE";
    }
}

UserSchema.statics.register = async function(registerParams){
  //rigster user begin
  const bcrypt = require('bcrypt');
  const uuid = require("uuid/v4")();
  const password = registerParams.password;
  let username = registerParams.username;
  let email = registerParams.email;
  let wechat = registerParams.wechat;
  let mobile = registerParams.mobile;
  let qq = registerParams.qq;
  
  if(!username){
    username = "unset"+uuid;
  }
  
  if(!wechat){
    wechat = "unset"+uuid;
  }
  if(!mobile){
    mobile = "unset"+uuid;
  }else{
    const isMobileExist = await this.findOne({mobile});
    if(isMobileExist){
      return "MOBILE_ALREADY_EXISTS";
    }
    if(!/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(mobile)){
      return "MOBILE_FORMAT_WRONG"
    }
  }
  if(!qq){
    qq = "unset"+uuid;
  }
  if(!password){
    return "PASSWORD_MISSING";
  }
  if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
    return "PASSWORD_FORMAT_WRONG"
  }
  if(!email){
    email = "unset"+uuid;
  }else{
    
    const isEmailExist =  await this.findOne({email});
    
    if(isEmailExist){
      return "EMAIL_ALREADY_EXISTS";
    }
    
  }
  const saltRounds = Math.random();
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  try {
      return await this.create({
        username,
        email,
        wechat,
        mobile,
        qq,
        password: hash
      });
  } catch (error) {
      return error;
  }
  // register user end
}

const User = mongoose.model("User", UserSchema);


module.exports = User;