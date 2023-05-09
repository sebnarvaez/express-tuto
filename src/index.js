const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan')

const app = express()
// Express settings. Siempre antes que los middlewares.
app.set('appName', 'Express Tuto')
app.set('puerto', 3000)

app.use(morgan('dev'))

// Puedo usar la funcion use para hacer un pre-procesamiento
// sin importar la URL. Esta funcion o callback que se le pasa
// a use() se llama Middleware
// Pueden haber muchos middlewares, y se ejecutaran en orden de
// aparicion. Asi que si quiero que una ruta no pase por middleware,
// debo ponerla antes de ese middleware.
app.use((req, res, next) => {
    console.log(`Pase por use() a traves de la ruta ${req.url} y usando el metodo ${req.method}`);

    // Es necesario llamar esta funcion para que express emita
    // la respuesta correspondiente a la URL. De lo contrario,
    // hara lo que esta en esta funcion use y luego no dara
    // respuesta al navegador
    next()
})

// Get se encarga de las peticiones GET, que se envian automaticamente
// desde el navegador cuando se visita una URL, y el argumento es lo que
// viene despues del slash.
/*
app.get('/', (req, res) => {
    res.static('./static/index.html', {
        root: __dirname,
    })
})
*/

// Extraer parametros de la URL
app.get('/hello/:usuario', (req, res) => {
    res.send(`Hello ${req.params["usuario"]}`);
})

// Extraer Queries (lo que viene despues de un ? en una URL)
// Cada variable de la query va separada por el signo &
// Si se repite un valo rn la query (Ej: ?id=1&id=2), el valor
// de esta variable sera una lista con todos esos valores (id: [1. 2])
app.get('/usuarios/crear', (req, res) => {
    res.send(`Creando usuario ${req.query['nombre']}, con id ${req.query['id']}`);
})


// Interpreta los datos que vienen desde el cliente
// como texto o json. Si no pongo como interpretar los
// datos, siempre obtendre undefined desde el servidor.
//app.use(express.text());
app.use(express.json());

// Maneja las peticiones POST, que se pueden enviar desde el cliente 
// mediante JS, o con programas que sirvan de cliente REST
app.post('/productos', (req, res) => {
    console.log(req.body);
    res.send('Creando productos');
})

// Si quiero responder de la misma forma a todos los tipos de Request
// (GET, POST, PUSH, DELETE...), uso el metodo all()
app.all('/todosreq', (req, res) => {
    res.send('Misma respuesta para todo tipo de Request');
});

// Use se encarga de manejar las rutas que no han sido manejadas antes.
// es decir, la respuesta por defecto cuando no se neuentra la pagina (404)
//app.use((req, res) => {
    /*
    Debo enviar manualmente el Status 404 para darle al navegador
    informacion sobre el error que esta ocurriendo. De lo contrario,
    se retornara el codigo 200 (todo salio bien).
    */
//    res.status(404).send('No se encontro la pagina');
//})


app.use('/', express.static(__dirname))

console.log(`Iniciando ${app.get('appName')} en el puerto ${app.get('puerto')}`)
app.listen(app.get('puerto'))