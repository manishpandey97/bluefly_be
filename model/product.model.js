const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    brand_name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    neck_type: { type: String, required: true },
    dress_type: { type: String, required: true },
    color: { type: String, required: true },
    sleeve_type: { type: String, required: true },
    material: { type: String, required: true },
    wash: { type: String, required: true },
    origin_countery: { type: String, required: true },
    imgaes: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, {
    versionKey: false,
    timestamps: true
})

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;