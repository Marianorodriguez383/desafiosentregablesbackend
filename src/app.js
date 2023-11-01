import express from "express"; 
import ProductManager from "./productManager.js";

const app = express()
const PORT = 8080

const productManager = new ProductManager('product.json')

// Cargar los productos al iniciar el servidor
productManager.loadProducts();

app.listen(PORT,()=>{
    console.log(`Servidor express activo en el puerto ${PORT}`)
})


app.get('/products',(req,res)=>{
    const limit = req.query.limit;

    let products = productManager.getProducts();

    if (limit) {
        products = products.slice(0, parseInt(limit));
      }
    res.json(products)
})

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  });


