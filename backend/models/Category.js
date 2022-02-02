const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
        name: String,
        _parentCategoryId: mongoose.Schema.Types.ObjectId,
        createdAt: {
            type: Date,
            default: Date.now()
        },
});


module.exports = mongoose.model("Category",categorySchema);