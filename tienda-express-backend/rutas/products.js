const { Router } = require('express');
const routes = Router();
const _ = require('underscore');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'images/products/' });

const productos = require('../data/products.json');

routes.get('/', (req, res) => {
    res.json({"nombre" : "Hola mundo"});
});

routes.get('/products', (req, res) => {
    res.json(productos);
});


routes.post('/products/new2', upload.single('image'), (req, res) => {
  const file = req.file;
  const fileExtension = path.extname(file.originalname);

  const id = productos.length + 1;
  const nuevoProducto = req.body;

  nuevoProducto.id = id;
  nuevoProducto.unit_price = +nuevoProducto.unit_price;
  nuevoProducto.count = +nuevoProducto.count;
  nuevoProducto.issale = JSON.parse(nuevoProducto.issale);
  
  const directoryPath = 'images/products/';

  const readStream = fs.createReadStream(file.path);

  nuevoProducto.img = nuevoProducto.name + "-" + nuevoProducto.id + fileExtension;

  const writeStream = fs.createWriteStream(directoryPath + nuevoProducto.name + "-" + nuevoProducto.id + fileExtension);

  readStream.pipe(writeStream);

  writeStream.on('finish', () => {
    console.log("imagen escrita");
    fs.unlinkSync(file.path);
  });

  writeStream.on('error', (err) => {
    console.error('Error escribiendo archivo:', err);

    res.status(500).send('Error subiendo archivo');
  });

  productos.push(nuevoProducto);

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  fs.writeFile('data/products.json', JSON.stringify(productos, null, "\t", (key) => { if (key != "imgData") return val; }), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error registrando');
    } else {
      console.log('archivo escrito');
      res.status(200).send('Producto creado exitosamente');
    }
  });

});



routes.delete('/products/delete/:id', (req, res) => {
    const {id} = req.params;
    let product;

    _.each(productos, (producto, i) => {
        if(producto.id == id)
        {
            product = producto;
            productos.splice(i, 1);
        }
    });

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    fs.unlink("images/products/" + product.img, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('imagen eliminada');
    });


    fs.writeFile('data/products.json', JSON.stringify(productos, null, "\t", (key) => { if (key != "imgData") return val; }), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error registrando');
      } else {
        console.log('archivo escrito');
        res.status(200).send('Producto eliminado exitosamente');
      }
    });

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

    writeJson(JSON.stringify(productos, (key) => { if (key != "imgData") return val; }));

    res.json(productos);
});

routes.put('/products/editnew', upload.single('image'), (req, res) => {

  const productoModificado = req.body;

  const file = req.file;

  if(file)
  {
    const fileExtension = path.extname(file.originalname);   

    const id = productos.length + 1;

    const directoryPath = 'images/products/';

    const readStream = fs.createReadStream(file.path);

    productoModificado.img = productoModificado.name + "-" + productoModificado.id + fileExtension;

    const writeStream = fs.createWriteStream(directoryPath + productoModificado.name + "-" + productoModificado.id + fileExtension);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
      fs.unlinkSync(file.path);
    });

    writeStream.on('error', (err) => {
      console.error('Error escribiendo archivo:', err);

      res.status(500).send('Error subiendo archivo');
    });
  }

  _.each(productos, (producto, i) => {

      producto.imgData = null;

      if(producto.id == productoModificado.id)
      {
          producto.name = productoModificado.name;
          producto.description = productoModificado.description;
          producto.count = productoModificado.count;
          producto.unit_price = productoModificado.unit_price;
          producto.issale = productoModificado.issale;

          if(file)
          {
            producto.img = productoModificado.img;
          }
          
          producto.id = +producto.id;
          producto.unit_price = +producto.unit_price;
          producto.count = +producto.count;
          producto.issale = JSON.parse(producto.issale);
      }
  });

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  fs.writeFile('data/products.json', JSON.stringify(productos, null, "\t", (key) => { if (key != "imgData") return val; }), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error registrando');
    } else {
      console.log('archivo escrito');
      res.status(200).send('Producto creado exitosamente');
    }
  });

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
    const imagePath = 'images/products/' + imageName;
  
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Error retrieving image');
      } else {
        productoEncontrado.imgData = data.toString('base64');
  
        res.setHeader('Content-Type', 'application/json');
        res.send(productoEncontrado);
      }
    });
  });

  routes.get('/products/getproductimg/:id', (req, res) => {

    const {id} = req.params;
    let productoEncontrado = null;

    _.each(productos, (producto, i) => {
        if(producto.id == id)
        {
            productoEncontrado = producto;
            productoEncontrado.imgData = null;
        }
    });

    if (productoEncontrado == null) {
        return res.status(500).send('Producto no encontrado.');
    }

    const imageName = productoEncontrado.img;
    const imagePath = 'images/products/' + imageName;
  
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Error retrieving image');
      } else {
  
        res.setHeader('Content-Type', 'application/json');
        res.send({imgData: data.toString('base64')});
      }
    });
  });


function writeJson(json)
{
    fs.writeFile('data/products.json', json, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error registrando');
      } else {
        res.status(200).send('Producto creado exitosamente');
      }
    });
}

module.exports = routes;
