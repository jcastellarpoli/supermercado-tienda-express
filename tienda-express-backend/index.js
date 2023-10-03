const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//configuraciones
app.set('port', process.env.PORT || 4201);
app.set('json spaces', 2);

//middleware
app.use(morgan('dev'));

//habilitacion de todas las rutas de la api para otros sistemas que la quieran consumir
app.use(cors());

//permite manejar formatos json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./rutas/products'));
app.use(require('./rutas/users'));

//inicia la aplicacion
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});