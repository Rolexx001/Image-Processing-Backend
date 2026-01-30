const mongoose = require('mongoose');

const ImageSchema=new mongoose.Schema({
    originalName:String,
    path:String,
    processedUrl:String,
    status:{
        type:String,
        enum:['pending','processing','completed','failed'],
        default:'pending'
    }
},{timestamps:true});

module.exports=mongoose.model('Image',ImageSchema);