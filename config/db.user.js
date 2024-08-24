const { default: mongoose } = require("mongoose");


const tokenConnect=mongoose.connect(process.env.URL);

module.exports=tokenConnect;