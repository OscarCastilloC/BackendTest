const mongoose = require('mongoose');

const PedidoSchema = mongoose.Schema({
    numero_pedido: { type: String, required: true, unique: true },  // Campo de número de pedido
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    producto: {type: String, required: true},
    cantidad: { type: String, required: true},
    direccion: { type: String, required: true},
    mensaje: { type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('pedido',PedidoSchema);