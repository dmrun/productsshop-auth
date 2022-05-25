import pkg from 'mongoose';
const { Schema: _Schema, model } = pkg;
const Schema = _Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Product = model('product', ProductSchema);
export default Product;
