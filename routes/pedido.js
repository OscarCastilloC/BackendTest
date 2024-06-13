const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

router.post('/registrar_pedido',pedidoController.registrar_pedido);
router.get('/obtener_pedido/:id ',pedidoController.obtener_pedido);

module.exports = router;
