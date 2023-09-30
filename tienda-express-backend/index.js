const express = require('express');
const morgan = require('morgan');
const app = express();

//configuraciones
app.set('port', process.env.PORT || 4201);
app.set('json spaces', 2);

//middleware
app.use(morgan('dev'));

//permite manejar formatos json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./rutas/index'));

//inicia la aplicacion
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});