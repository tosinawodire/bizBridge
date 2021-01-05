const mongoose  = require('mongoose');
const express = require('express'),
		   ejs = require('ejs'),
		   app = express();
		   const passport = require("passport");
		   const session = require('express-session');
		   const flash = require('connect-flash');
		   require('./config/passport')(passport); 

		   const db  =  require('./config/keys').uri;

mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log('Mongo DB connected...'))
.catch(err => console.log(err)); //conncetion to the mongodb database


// const db =require('./config/keys').uri;
// mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology:true})
// .then(()=> console.log("Mongo DB connected"))
// .catch(err => console.log(err));


	app.use(express.urlencoded({extended:true}));
	app.use(express.static("public"));
	app.set('view engine', 'ejs');

	//Express Session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
        
    })
);


	// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

 // Global Variables Middleware
 app.use((req, res, next) => {
    res.locals.success_msg =  req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.name = req.user;
    next();
  });

//   app.use(function(req,res,next){
//     if (req.user) {
//         res.locals.user = req.user;
//     }
//     next();
//     });
    


	//Routes
	app.use('/', require('./routes/index')); 

	app.use('/artisan', require('./routes/artisan')); 


	app.listen(4040, function(){
		console.log("Server started on port 4040");
	})