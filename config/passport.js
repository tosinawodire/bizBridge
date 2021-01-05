const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Artisan = require('../model/Artisan');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'username' }, (username, password, done) => {

            //match user
            Artisan.findOne({username:username})
            .then(artisan => {
                if(!artisan){
                    return done(null, false, {message: 'That email is not registered'});
                }

                //Match password
                bcrypt.compare(password, artisan.password, (err, isMatch) =>{
                    if (err) throw err;

                    if(isMatch){
                        return done(null, artisan);
                    }
                    else{
                        return done(null, false, {message: 'password incorrect'})
                    }
                })
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser((Artisan, done)=> {
        done(null, Artisan.id);
    });

    
    
    passport.deserializeUser((id, done)=> {
        Artisan.findById(id, (err, Artisan) => {
            done(err, Artisan);
        });
    });
}
