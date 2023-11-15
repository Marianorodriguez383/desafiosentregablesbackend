import fs from 'fs';

class CartManager {
  constructor(cartFilePath) {
    this.cartFilePath = cartFilePath;
    this.carts = [];
  }

  loadCarts() {
    try {
      if (fs.existsSync(this.cartFilePath)) {
        const data = fs.readFileSync(this.cartFilePath, 'utf-8');
        this.carts = JSON.parse(data);
      } else {
        // Si el archivo no existe, inicializar this.carts como un array vacío
        this.carts = [];
      }
    } catch (error) {
      console.error('Error loading carts:', error.message);
    }
  }

  saveCarts() {
    try {
      fs.writeFileSync(this.cartFilePath, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error('Error saving carts:', error.message);
    }
  }

  createCart() {
    const newCart = {
      id: this.generateUniqueId(),
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  getCartById(cartId) {
    return this.carts.find((cart) => cart.id === cartId);
  }

  updateCart(cart) {
    const index = this.carts.findIndex((c) => c.id === cart.id);
    if (index !== -1) {
      this.carts[index] = cart;
      this.saveCarts();
    }
  }

  generateUniqueId() {
   
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export default CartManager;
