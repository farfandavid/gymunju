var express = require('express');
var app = express();

const { mongoose } = require('./database')
const cors = require('cors');

// Middlewares

app.use(express.json());
///app.use(cors({origin: 'http://localhost:4200'}));

// Modulo de direccionamiento de rutas

app.use('/api/alumno', require('./routes/alumno.route'));
app.use('/api/asistencia', require('./routes/asistencia.route'));
app.use('/api/cuota', require('./routes/cuota.route'));
app.use('/api/ejercicio', require('./routes/ejercicio.route'));
app.use('/api/plan', require('./routes/plan.route'));
app.use('/api/rutina', require('./routes/rutina.route'));
app.use('/api/usuario', require('./routes/usuario.route'));

// Setting

app.set('port', process.env.PORT || 3000);

// Starting the server

app.listen(app.get('port'), '0.0.0.0');

