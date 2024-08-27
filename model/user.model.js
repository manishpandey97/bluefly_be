const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    mobile_no: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "visitor", enum: ["buyer", "seller", "visitor", "admin"] }
}, {
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;