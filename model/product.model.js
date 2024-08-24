const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    brand_name: { type: String, required: true },
    product_type: { type: String, required: true },
    frame_type: { type: String, required: true },
    frame_shape: { type: String, required: true },
    model_no: { type: String, required: true },
    frame_size: { type: String, required: true },
    frame_width: { type: Number, required: true },
    frame_dimensions: { type: Number, required: true },
    frame_colour: { type: String, required: true },
    weight: { type: Number, required: true },
    weight_group: { type: String, required: true },
    material: { type: String, required: true },
    frame_material: { type: String, required: true },
    temple_material: { type: String, required: true },
    prescription_type: { type: String,  default: "Bifocal", enum: ["Bifocal", "Progressive"] },
    frame_style: { type: String, required: true },
    imgaes: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, {
    versionKey: false,
    timestamps: true
})

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;