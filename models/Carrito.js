const mongoose = require('mongoose');

const CarritoSchema = mongoose.Schema({
    producto: {type:mongoose.Schema.ObjectId, ref:'producto',required: true},
    cliente: {type:mongoose.Schema.ObjectId, ref:'cliente',required: true},
    cantidad: {type: Number, required: true},
    variedad: {type: String, required: true },
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('carrito',CarritoSchema);