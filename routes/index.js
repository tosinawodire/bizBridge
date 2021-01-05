const express = require('express'),
      router = express.Router();
      const { ensureAuthenticated } = require('../config/auth');

      const Artisan = require('../model/Artisan');

      // index.js or server.js

    // Jade template
    

router.get('/', (req, res) => {

    res.render('index');

})

router.get('/pricing', (req, res) => {

    res.render('pricing');

})

router.get('/search', (req, res) => {
res.render('search')
});

// router.get('/dashboard', ensureAuthenticated, (req, res) => 
// res.render('dashboard',{
//     username:username
    
    
// }

// ));
// router.get('/dashboard', ensureAuthenticated, (req, res)=>{
//     Artisan.find(function(err, result){
//         if (err)
//         {
//             console.log(err)

//         }else{
//             //console.log(result);
//             res.render('dashboard', {record:result})
//         }
//     })
// }
// )

router.get('/dashboard', ensureAuthenticated, (req, res)=>{
    res.render('dashboard', {
        username:req.user.cName
        

    })
    //console.log(req.user)
})

router.post('/', (req,res)=>{
    let what = req.body.what;
    let where = req.body.where;

        Artisan.find({title:what, city:where}, function(err, result){
            if(err){
                console.log(err);
                res.send('There is an issue')
            }
            else{
                res.render('search', {record:result,what:what,where:where})
            }
        })

})
 




module.exports=router; 