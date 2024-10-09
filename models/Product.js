import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    dateOfSale: { type: String, required: true }, // String for simplicity (regex for month filtering)
    isSold: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product; // Default export for ES modules
