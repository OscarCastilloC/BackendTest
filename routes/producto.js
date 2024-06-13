const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const auth = require('../middlewares/authenticate');
const multiparty =  require('connect-multiparty');
const path = multiparty({uploadDir: './uploads/productos'});

router.post('/registro_producto_admin',[auth.auth,path],productoController.registro_producto_admin);
router.get('/listar_productos_admin/:filtro?',auth.auth,productoController.listar_productos_admin);
router.get('/obtener_portada/:img',productoController.obtener_portada);
router.get('/obtener_producto_admin/:id',auth.auth,productoController.obtener_producto_admin);
router.put('/actualizar_producto_admin/:id',[auth.auth,path],productoController.actualizar_producto_admin);
router.delete('/eliminar_producto_admin/:id',auth.auth,productoController.eliminar_producto_admin);
router.put('/actualizar_producto_variedades_admin/:id',auth.auth,productoController.actualizar_producto_variedades_admin);
router.put('/agregar_imagen_galeria_admin/:id',[auth.auth,path],productoController.agregar_imagen_galeria_admin);
router.put('/eliminar_imagen_galeria_admin/:id',auth.auth,productoController.eliminar_imagen_galeria_admin);

//Inventario
router.get('/listar_inventario_producto_admin/:id',auth.auth,productoController.listar_inventario_producto_admin);
router.delete('/eliminar_inventario_producto_admin/:id',auth.auth,productoController.eliminar_inventario_producto_admin);
router.post('/registro_inventario_producto_admin',auth.auth,productoController.registro_inventario_producto_admin);

//Publicos
router.get('/listar_productos_publico/:filtro?',productoController.listar_productos_publico);
router.get('/listar_productos_publico_bot/:filtro?',productoController.listar_productos_publico_bot);
router.get('/obtener_productos_slug_publico/:slug',productoController.obtener_productos_slug_publico);
router.get('/listar_productos_recomendados_publico/:categoria',productoController.listar_productos_recomendados_publico);
router.get('/listar_titulos_productos_publico_bot/:filtro?',productoController.listar_titulos_productos_publico_bot);


router.get('/recommendations/:productId', async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      const recommendations = await Product.find({
        category: product.category,
        price: { $gte: product.price * 0.8, $lte: product.price * 1.2 },
        _id: { $ne: product._id }
      }).limit(5);
  
      res.json(recommendations);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;