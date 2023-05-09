const express = require('express');
const morgan = require('morgan');

const app = express();
let productos = [
    {
        "id": 1,
        "title": "iPhone 9",
        "description": "An apple mobile which is nothing like apple",
        "price": 549,
        "discountPercentage": 12.96,
        "rating": 4.69,
        "stock": 94,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/1/1.jpg",
            "https://i.dummyjson.com/data/products/1/2.jpg",
            "https://i.dummyjson.com/data/products/1/3.jpg",
            "https://i.dummyjson.com/data/products/1/4.jpg",
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        ]
    },
    {
        "id": 2,
        "title": "iPhone X",
        "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        "price": 899,
        "discountPercentage": 17.94,
        "rating": 4.44,
        "stock": 34,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/2/1.jpg",
            "https://i.dummyjson.com/data/products/2/2.jpg",
            "https://i.dummyjson.com/data/products/2/3.jpg",
            "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
        ]
    },
    {
        "id": 3,
        "title": "Samsung Universe 9",
        "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
        "price": 1249,
        "discountPercentage": 15.46,
        "rating": 4.09,
        "stock": 36,
        "brand": "Samsung",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/3/1.jpg"
        ]
    },
    {
        "id": 4,
        "title": "OPPOF19",
        "description": "OPPO F19 is officially announced on April 2021.",
        "price": 280,
        "discountPercentage": 17.91,
        "rating": 4.3,
        "stock": 123,
        "brand": "OPPO",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/4/1.jpg",
            "https://i.dummyjson.com/data/products/4/2.jpg",
            "https://i.dummyjson.com/data/products/4/3.jpg",
            "https://i.dummyjson.com/data/products/4/4.jpg",
            "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
        ]
    },
]

app.use(morgan('dev'));

app.get('/productos', (req, res) => {
    res.json(productos)
})

app.use(express.json());

app.post('/productos', (req, res) => {
    console.log('Recibido objeto por POST', req.body)

    const nuevoProducto = {...req.body, id: productos.length + 1}
    productos.push(nuevoProducto)

    res.send(nuevoProducto)
})

app.put('/productos/:id', (req, res) => {
    const prodEncontrado = productos.find(p => p.id === parseInt(req.params["id"]))
    
    if (!prodEncontrado) {
        return res.status(404).json({
            "message": "Producto no encontrado",
        })
    }

    let newData = req.body;
    console.log(newData)

    productos = productos.map(p => p.id === parseInt(req.params["id"]) ? {
        ...p, // Copia todos los valores de p
        ...newData // Y reemplaza los que contenga newData
    } : p)
    
    res.json({
        "message": "Producto actualizado con exito!"
    })
})

app.delete('/productos/:id', (req, res) => {
    const prodEncontrado = productos.find(p => p.id === parseInt(req.params["id"]))
    
    if (!prodEncontrado) {
        return res.status(404).json({
            "message": "Producto no encontrado",
        })
    }
    return res.sendStatus(204); // Todo salio bien, no se envia respuesta.
})


app.get('/productos/:id', (req, res) => {
    const prodEncontrado = productos.find(p => p.id === parseInt(req.params["id"]))
    
    if (!prodEncontrado) {
        return res.status(404).json({
            "message": "Producto no encontrado",
        })
    }
    else {
        productos = productos.filter(p => p.id === parseInt(req.params["id"]))
    }

    return res.json(prodEncontrado)
})

app.listen(3000);
console.log(`Servidor en puerto ${3000}`)