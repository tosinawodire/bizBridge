const express = require('express'),
 router = express.Router();
 const bcrypt = require('bcryptjs');
 const mongoose = require('mongoose');
const passport = require('passport');

 const Artisan = require('../model/Artisan');

 let fs = require('fs');
let path = require('path');
let multer = require('multer');

 // MULTER
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
      console.log(file);
      cb(null, file.fieldname +'-'+ Date.now());
    }
  })
  
  let upload = multer({storage:storage});
  

router.get('/register', (req, res) => {

    res.render('register');
   

})

router.get('/login', (req, res) => {

    res.render('login');

})




router.post('/register', upload.single('image'), (req, res)=>{
    const{cName, cNumber,cEmail, bName, cacStatus, title, staffStrength, 
        address, city, website, username, password,password2,date} = req.body;

    let errors = [];

    //Check required fields match
    // if(!cName ||!cNumber || !cEmail || !bName || !cacStatus || !title || !staffStrength || 
    //     !address || !city || !website|| !username || !password || !password2){
    //     errors.push({msg: "Please fill in all fields"});
    // req.flash('error_msg', 'Please fill in all the fields');
    // //res.redirect('/artisan/register');

    // }

    //Check passwords match

    if (!cacStatus ){
      
    req.flash('error_msg', 'Please choose if your company is registered with CAC');
    //res.redirect('/artisan/register');
    // console.log(errors)
}


    if(password !== password2){
        errors.push({msg: "Passwords do not match"});
        req.flash('error_msg', 'Passwords do not match')
           // res.redirect('/artisan/register');

    }
    //Check password length
    if(password.length < 6){
        errors.push({msg: "password should be at least six characters"})
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            cName, cNumber,cEmail, bName, cacStatus, title, staffStrength, 
        address, city, website, username, password,password2
        });

    }else{
        //validation passed
            Artisan.findOne({ username: username  })
            .then(artisan => {
                if(artisan){
                    //user exists
                    errors.push({msg: 'Username is already registered'});
                    res.render('register', {
                        errors,
                        cName, cNumber,cEmail, bName, cacStatus, title, staffStrength, 
                        address, city, website, username, password,password2
                    });

                }
                else{
                    const newArtisan = new Artisan({
                        cName, cNumber,cEmail, bName, cacStatus, title, staffStrength, 
        address, city, website, username, password, date,  upload:{
            data:fs.readFileSync(path.join('C:/Users/Tosin/Desktop/codecenterclass/bizbridge'+'/uploads/'+req.file.filename)),
            contentType: 'image/png'
          }

                    });
                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newArtisan.password, salt, (err, hash) => {
                            if(err) throw err;

                            //Set password hashed
                            newArtisan.password = hash;

                            //Save new user
                            newArtisan.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now successfully registered and can log in')
                                res.redirect('/artisan/login');
                            })
                            .catch(err => console.log(err))
                    }))

                }
            });
    }
});

//login handle

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/dashboard',
        failureRedirect:'/artisan/login',
        failureFlash:true
    })(req, res, next);
} );

router.get('/logout', (req, res) =>{
    req.logout;
     req.session.destroy();
     req.session = null;
    //req.flash('success_msg', 'You are successfully logged out');
    res.redirect('/artisan/login');
 });
 







module.exports=router; 