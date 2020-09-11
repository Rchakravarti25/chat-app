var localStrategy = require("passport-local");
var Model = require("../models/index");

module.exports = function(passport){
	passport.serializeUser(function(user,done){
		done(null,user);
	});
	passport.deserializeUser(function(user,done){
		done(null,user);
	});
	passport.use(new localStrategy({
		usernameField : "username",
		passwordField : "password"
	},function(username,password,done){
		Model.User.findOne({where:{UserEmail : username}}).then((user)=>{
			if(user && user.Password == password){
				done(null,user);
			}else{
				done(null,false);
			}
		}).catch((err)=>{
			console.log(err);
			done(err);
		});
	}));
}