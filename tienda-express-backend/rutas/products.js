const { Router } = require('express');
const routes = Router();
const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: '/images/products/' });

const productos = require('../data/products.json');

routes.get('/', (req, res) => {
    res.json({"nombre" : "Hola mundo"});
});

routes.get('/products', (req, res) => {
    res.json(productos);
});


routes.post('/products/new2', upload.single('image'), (req, res) => {
  // Handle the uploaded file
  const file = req.file;
  const fileExtension = path.extname(file.originalname);

  const id = productos.length + 1;
  const nuevoProducto = req.body;
  
  // Specify the directory path where you want to save the file
  const directoryPath = '/images/products/';

  // Create a readable stream from the uploaded file
  const readStream = fs.createReadStream(file.path);

  nuevoProducto.img = nuevoProducto.name + "-" + nuevoProducto.id + fileExtension;

  // Create a writable stream to the desired directory
  const writeStream = fs.createWriteStream(directoryPath + nuevoProducto.name + "-" + nuevoProducto.id + fileExtension);

  // Pipe the readable stream to the writable stream to save the file
  readStream.pipe(writeStream);

  // Event handlers for when the file is finished writing or encounters an error
  writeStream.on('finish', () => {
    // Delete the temporary file
    fs.unlinkSync(file.path);
  });

  writeStream.on('error', (err) => {
    console.error('Error escribiendo archivo:', err);

    // Send an error response to the client
    res.status(500).send('Error subiendo archivo');
  });

  productos.push(nuevoProducto);

  writeJson(JSON.stringify(productos));

  // Send a response to the client
  res.status(200).send('Producto creado exitosamente');
});



// routes.post('/products/new', (req, res) => {
//     const id = productos.length + 1;
//     const nuevoProducto = req.body;

//     productos.push(nuevoProducto);

//     writeJson(JSON.stringify(productos));

//     res.json(productos);
// });

routes.delete('/products/delete/:id', (req, res) => {
    const {id} = req.params;
    _.each(productos, (producto, i) => {
        if(producto.id == id)
        {
            productos.splice(i, 1);
        }
    });

    writeJson(JSON.stringify(productos));
    fs.delete(producto.img);

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

routes.get('/products/findbyidnew/:id', (req, res) => {

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

    const imageName = productoEncontrado.img;
    const imagePath = '/images/products/' + imageName;
  
    // Use the fs module to read the image file
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Error retrieving image');
      } else {
        // Create an object with additional properties
        productoEncontrado.imgData = data.toString('base64');
  
        // Set the appropriate content type
        res.setHeader('Content-Type', 'application/json');
        res.send(productoEncontrado);
      }
    });
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
