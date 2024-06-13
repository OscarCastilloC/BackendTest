const Pedido = require ("../models/Pedido");

exports.registrar_pedido = async (req, res) => {
    try {
        const data = req.body;

        // Generar un número de pedido único
        const numeroPedido = await generarNumeroPedidoUnico();
        data.numero_pedido = numeroPedido;

        // Crear un nuevo pedido
        const nuevoPedido = await Pedido.create(data);

        // Responder con éxito
        res.status(200).send({ message: 'Pedido registrado con éxito', pedido: nuevoPedido });
    } catch (error) {
        // Manejar errores
        console.error('Error al registrar el pedido:', error);
        res.status(500).send({ message: 'Error del servidor', error });
    }
};

// Función para generar un número de pedido único de 4 dígitos
async function generarNumeroPedidoUnico() {
    let numeroPedido;
    let existe = true;

    while (existe) {
        // Generar un número aleatorio de 4 dígitos
        numeroPedido = Math.floor(1000 + Math.random() * 9000).toString();

        // Verificar si el número ya existe en la base de datos
        const pedidoExistente = await Pedido.findOne({ numero_pedido: numeroPedido });
        existe = !!pedidoExistente;
    }

    return numeroPedido;
};

exports.obtener_pedido = async (req, res) => {
        const { numero_pedido } = req.params;

    try {
        const pedido = await Pedido.findOne({ numero_pedido });

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.status(200).json(pedido);
    } catch (error) {
        console.error('Error al buscar por número de pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
