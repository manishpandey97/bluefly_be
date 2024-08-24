const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "visitor", enum: ["buyer", "seller", "visitor", "admin"] }
}, {
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;