var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// set up User Schema
var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

// plugin Passport-Local Mongoose into User schema
//     Passport-Local Mongoose will add a username, 
//   hash and salt field to store the username, 
//   the hashed password and the salt value.
UserSchema.plugin(passportLocalMongoose);

// initialize User model
var User = mongoose.model("User", UserSchema);

module.exports = User;

