import { Router } from 'express';
import CartManager from '../cartManager.js';
import ProductManager from '../productManager.js';
import fs from 'fs';

const router = Router();
const cartManager = new CartManager('carts.json');
const productManager = new ProductManager('products.json');

// Cargar los carritos al iniciar el servidor
cartManager.loadCarts();

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
  const newCart = cartManager.createCart();
  res.json(newCart);
});

// Ruta para obtener los productos de un carrito por su ID
router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = cartManager.getCartById(cartId);

  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

// Ruta para agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);

  const cart = cartManager.getCartById(cartId);
  const product = productManager.getProductById(productId);

  if (!cart || !product) {
    res.status(404).json({ message: 'Carrito o producto no encontrado' });
    return;
  }

  // Verificar si el producto ya existe en el carrito
  const existingProduct = cart.products.find((item) => item.product === productId);

  if (existingProduct) {
    // Incrementar la cantidad si el producto ya existe
    existingProduct.quantity += 1;
  } else {
    // Agregar el producto al carrito si no existe
    cart.products.push({
      product: productId,
      quantity: 1,
    });
  }

  // Guardar los cambios en el carrito
  cartManager.updateCart(cart);

  res.json(cart.products);
});

export default router;
