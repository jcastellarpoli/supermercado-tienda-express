const { Router } = require('express');
const routes = Router();
const _ = require('underscore');
const fs = require('fs');

const productos = require('../data/products.json');

routes.get('/', (req, res) => {
    res.json({"nombre" : "Hola mundo"});
});

routes.get('/products', (req, res) => {
    res.json(productos);
});

routes.post('/products/new', (req, res) => {
    const id = productos.length + 1;
    const nuevoProducto = req.body;

    productos.push(nuevoProducto);

    writeJson(JSON.stringify(productos));

    res.json(productos);
});

routes.delete('/products/delete/:id', (req, res) => {
    const {id} = req.params;
    _.each(productos, (producto, i) => {
        if(producto.id == id)
        {
            productos.splice(i, 1);
        }
    });

    writeJson(JSON.stringify(productos));

    res.json(productos);
});

routes.put('/products/edit/', (req, res) => {

    const productoModificado = req.body;

    _.each(productos, (producto, i) => {

        if(producto.id == productoModificado.id)
        {
            producto.nombre = productoModificado.nombre;
            producto.cantidad = productoModificado.cantidad;
        }
    });

    writeJson(JSON.stringify(productos));

    res.json(productos);
});

routes.get('/products/findbyid/:id', (req, res) => {
    const {id} = req.params;
    let productoEncontrado = null;

    _.each(productos, (producto, i) => {
        if(producto.id == id)
        {
            productoEncontrado = producto;
        }
    });

    if (productoEncontrado == null) {
        return res.status(500).send('Producto no encontrado.');
    }

    res.json(productoEncontrado);
});


function writeJson(json)
{
    fs.writeFile('../data/products.json', json, err => {
        if (err) {
          console.error(err);
        }
      });
}

module.exports = routes;
