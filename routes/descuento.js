const express = require('express');
const router = express.Router();

const descuentoController = require('../controllers/descuentoController');
const auth = require('../middlewares/authenticate');
const multiparty =  require('connect-multiparty');
const path = multiparty({uploadDir: './uploads/descuentos'});

router.post('/registro_descuento_admin',[auth.auth,path],descuentoController.registro_descuento_admin);
router.get('/listar_descuentos_admin/:filtro?',auth.auth,descuentoController.listar_descuentos_admin);
router.get('/obtener_banner_descuento/:img',descuentoController.obtener_banner_descuento);
router.get('/obtener_descuento_admin/:id',auth.auth,descuentoController.obtener_descuento_admin);
router.put('/actualizar_descuento_admin/:id',[auth.auth,path],descuentoController.actualizar_descuento_admin);
router.delete('/eliminar_descuento_admin/:id',auth.auth,descuentoController.eliminar_descuento_admin);
router.get('/obtener_descuento_activo',descuentoController.obtener_descuento_activo)

module.exports = router;