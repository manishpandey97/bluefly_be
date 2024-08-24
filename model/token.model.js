const { default: mongoose } = require("mongoose");

const tokenSchema=mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    blockToken:{type:String,required:true}
})

const tokenModel=mongoose.model('token',tokenSchema);

module.exports=tokenModel;