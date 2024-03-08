const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    fullname: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    telefono: {type: String},
    creationdate: {type: Date, default: Date.now},
    imagen: {type: String, default: "https://static.vecteezy.com/system/resources/previews/020/911/737/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"}
})

UserSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, encryptedPass){
            if(err) return next(err);
            user.password = encryptedPass;
            next();
        })
    })

})

UserSchema.methods.comparePassword = function(pass, cb){
    bcrypt.compare(pass, this.password, function(err, next){
        if(err) return cb(err);
        cb(null, next);
    })
}

module.exports = mongoose.model('User',UserSchema);