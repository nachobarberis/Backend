import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const manager = new ProductManager();

app.get('/products', async (req, res) => {

    const productos = await manager.getProducts()
    let productosLimit;

    if (req.query.limit && !isNaN(req.query.limit)) {
        productosLimit = productos.slice(0,req.query.limit)
        res.json({ productosLimit })
    }else{
        res.json({ productos })
    }

});

app.get('/products/:pid', async (req, res) => {

    const { pid } = req.params

    const producto = await manager.getProductById(parseInt(pid))
    res.json({ producto })

});


app.listen(8080, () => {
    console.log('Escuchando el puerto 8080');
});

