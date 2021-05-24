const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');

app.use(cors());
app.use(bodyParser.json());

//MONGODB CONNECTION
require('./database');

//IMPORT ROUTE
const activoRoute = require('./routes/activo');
const clienteRoute = require('./routes/cliente');
const productoRoute = require('./routes/producto');
const proveedorRoute = require('./routes/proveedor');
const rolRoute = require('./routes/rol');
const userRoute = require('./routes/usuario');

//Documentation
//INIT ROUTE
app.use('/activo', activoRoute);
app.use('/cliente', clienteRoute);
app.use('/producto', productoRoute);
app.use('/proveedor', proveedorRoute);
app.use('/rol', rolRoute);
app.use('/usuario', userRoute);

//START SERVER
app.listen(8000);