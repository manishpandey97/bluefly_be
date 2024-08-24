const { default: mongoose } = require("mongoose");


const userConnect=mongoose.connect(process.env.URL);

module.exports=userConnect;