const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        name: String,
        price: String,
        description: String,
        color: String,
        categories: [],
        stock: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
});


module.exports = mongoose.model("Product",productSchema);