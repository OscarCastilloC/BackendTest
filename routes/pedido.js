const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

router.post('/registrar_pedido',pedidoController.registrar_pedido);