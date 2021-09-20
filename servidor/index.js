const express = require('express');
const conectarDB = require('./config/db');
var cors = require('cors')


const app = express()


conectarDB();

app.use(cors())

app.use( express.json({ extended: true }));


const port = process.env.PORT || 4000;


app.use('/api/usuarios', require('./routes/usuarios') )
app.use('/api/auth', require('./routes/auth') )
app.use('/api/proyectos', require('./routes/proyectos') )
app.use('/api/tareas', require('./routes/tareas') )


app.listen(port, "0.0.0.0", () => {
    console.log( `sofi linda ${PORT}`);
})
