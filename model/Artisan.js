const mongoose = require('mongoose');

const ArtisanSchema = new mongoose.Schema({

    cName:{
        type:String,
        required:true
    },
    cNumber:{
        type:String,
        required:true
    },
    cEmail:{
        type:String,
        required:true
    },

    bName:{
        type:String,
        required:true
    },

    cacStatus:{
        type:String,
        required:true
    },

    title:{
        type:String,
        required:true
    },
    
    staffStrength:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },
    
    city:{
        type:String,
        required:true
    },

    website:{
        type:String,
        required:true
    },

    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    upload:{
        data:Buffer,
        contentType: String
    },

    date:{
        type:Date,
        default:Date.now
        
    }


});


 const Artisan = mongoose.model('Artisan', ArtisanSchema)
 module.exports = Artisan;