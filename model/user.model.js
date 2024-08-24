const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String },
    mobile_no: { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "visitor", enum: ["buyer", "seller", "visitor", "admin"] }
}, {
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;