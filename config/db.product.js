const { default: mongoose } = require("mongoose");


const productConnect=mongoose.connect(process.env.URL);

module.exports=productConnect;