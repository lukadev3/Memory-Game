const mongoose = require("mongoose")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const config = require("../config")

var UserSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email cannot be empty"] },
  admin: { type: Boolean, required: true, default: false },
  hash: { type: String, required: true },
  salt: { type: String, required: true }
})

UserSchema.methods.savePassword = function(password){
    this.salt = crypto.randomBytes(16).toString("hex")
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
}

UserSchema.methods.getRole = function(){
    if (this.admin == true)
        return "ADMIN"
    return "USER"
}

UserSchema.methods.validatePassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return this.hash === hash;
}

UserSchema.methods.generateJwt = function(){
    var expire = new Date()+7
    console.log(expire)

    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        _expire: expire
    }, config.secretKey)

}

var UserModel = mongoose.model("user", UserSchema)

UserModel.register = function(name, email, password){
    var user = new UserModel({
        name: name,
        email: email
    })

    user.savePassword(password);

    console.log(user)
    
    var newUser = user.save()
    return newUser;


}

module.exports = UserModel
