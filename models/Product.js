import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    dateOfSale: { type: String, required: true }, // String for simplicity (regex for month filtering)
    isSold: { type: Boolean, default: false },
    image: { type: String }, // Field to store image URL or path
    originalId: { type: String, required: true }, // Field to store the original provided ID
}, {
    timestamps: false // Disable automatic creation of createdAt and updatedAt fields
});

const Product = mongoose.model('Product', ProductSchema);

export default Product; // Default export for ES modules

