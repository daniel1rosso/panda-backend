const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Documentation
const cors = require('cors');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
const ventaRoute = require('./routes/venta');
const ventaDetalleRoute = require('./routes/venta_detalle');
const compraRoute = require('./routes/compra');
const compraDetalleRoute = require('./routes/compra_detalle');
const loginRoute = require('./routes/login');
const provinciasRoute = require('./routes/provincia');
const configuracionInicialRoute = require('./routes/config_inicial');
const historialOperacionesRoute = require('./routes/historial_operaciones');

//INIT ROUTE
app.use('/activo', activoRoute);
app.use('/cliente', clienteRoute);
app.use('/producto', productoRoute);
app.use('/proveedor', proveedorRoute);
app.use('/rol', rolRoute);
app.use('/usuario', userRoute);
app.use('/venta', ventaRoute);
app.use('/venta_detalle', ventaDetalleRoute);
app.use('/compra', compraRoute);
app.use('/compra_detalle', compraDetalleRoute);
app.use('/login', loginRoute);
app.use('/provincia', provinciasRoute);
app.use('/configuracion_inicial', configuracionInicialRoute);
app.use('/historial_operaciones', historialOperacionesRoute);

//START SERVER
app.listen(8000);