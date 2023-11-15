import { Router } from 'express';
import ProductManager from '../productManager.js';

const router = Router();
const productManager = new ProductManager('product.json');

// Cargar los productos al iniciar el servidor
productManager.loadProducts();

// Rutas para /api/products
router.get('/api/products/', (req, res) => {
  // Obtener todos los productos de la base
  const products = productManager.getProducts();
  console.log(products); // Agrega esta línea para imprimir los productos en la consola
  res.json(products);
});


router.get('/api/products/:pid', (req, res) => {
  // Obtener un producto por su ID
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Endpoint para obtener todos los productos
router.get('/', (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }
  res.json(products);
});

// Endpoint para obtener un producto por su ID
router.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Ruta para eliminar un producto por su ID
router.delete('/:pid', (req, res) => {
  // Obtener el ID del parámetro de la URL
  const productId = parseInt(req.params.pid);

  // Eliminar el producto utilizando el ProductManager
  productManager.deleteProduct(productId);

  // Enviar una respuesta
  res.json({ message: 'Producto eliminado correctamente' });
});

export default router;
