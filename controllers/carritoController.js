const Carrito = require ("../models/Carrito");

exports.agregar_carrito_cliente = async (req,res) => {
    if (req.user) {
        let data = req.body;
        let carrito_cliente = await Carrito.find({cliente:data.cliente,producto:data.producto});

        if (carrito_cliente.length == 0){
            let reg = await Carrito.create(data);
            res.status(200).send({data:reg});
        }

        else if (carrito_cliente.length >= 1){
            res.status(200).send({data:undefined});
        }
        
    }

    else {
        res.status(500).send({message: 'No tiene acceso'});
    }
};

exports.obtener_carrito_cliente = async (req,res) => {
    if (req.user) {
        let id = req.params['id'];

        let carrito_cliente = await Carrito.find({cliente:id}).populate('producto');
        res.status(200).send({data:carrito_cliente});
        
    }

    else {
        res.status(500).send({message: 'No tiene acceso'});
    }
};

exports.eliminar_carrito_cliente = async (req,res) => {
    if (req.user) {
       
        let id = req.params['id'];

        let reg = await Carrito.findByIdAndRemove({_id:id});
        res.status(200).send({data:reg});
        
    }

    else {
        res.status(500).send({message: 'No tiene acceso'});
    }
};