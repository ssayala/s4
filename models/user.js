var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

UserSchema = Schema({
    name:           String,
    email:  {
        type: String,
        index: true,
        unique: true
    },
    hash:           String,
    customerId:     String,
    locked:         Boolean,
    disabled:       Boolean,
    administrator:  Boolean,
    lastLogin:      Date
});

UserSchema.statics.new = function(name, email, password, done){
    var User = this;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    User.create({ name: name, email : email, hash : hash }, function(err, user){
        if(err) throw err;
        //if (err) return done(err);
        done(null, user);
    });
}

UserSchema.statics.isValidUserPassword = function(email, password, done) {
    this.findOne({email : email}, function(err, user){
        // if(err) throw err;
        if(err) return done(err);
        if(!user) return done(null, false, { message : 'either the email or password is incorrect.' });

        bcrypt.compare(password, user.hash, function(err, res) {
            if (res) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        });
    });
};

var User = mongoose.model("User", UserSchema);
module.exports = User;
