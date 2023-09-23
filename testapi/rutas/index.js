const { Router } = require('express');
const routes = Router();
const _ = require('underscore');
const fs = require('fs');

const productos = require('../productos.json');

routes.get('/', (req, res) => {
    res.json({"nombre" : "Hola mundo"});
});

routes.get('/productos', (req, res) => {
    res.json(productos);
});

routes.post('/nuevoproducto', (req, res) => {
    const id = productos.length + 1;
    const nuevoProducto = req.body;

    productos.push(nuevoProducto);

    writeJson(JSON.stringify(productos));

    res.json(productos);
});

routes.delete('/eliminarproducto/:id', (req, res) => {
    const {id} = req.params;
    _.each( (producto, i) => {
        if(producto.id == id)
        {
            productos.splice(i, 1);
        }
    });

    writeJson(JSON.stringify(productos));

    res.json(productos);
});

routes.put('/editarproducto/', (req, res) => {

    const productoModificado = req.body;

    _.each( (producto, i) => {

        if(producto.id == productoModificado.id)
        {
            producto.nombre = productoModificado.nombre;
            producto.cantidad = productoModificado.cantidad;
        }
    });

    writeJson(JSON.stringify(productos));

    res.json(productos);
});

function writeJson(json)
{
    fs.writeFile('../productos.json', json, err => {
        if (err) {
          console.error(err);
        }
      });
}

module.exports = routes;
