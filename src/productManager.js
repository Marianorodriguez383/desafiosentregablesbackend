import fs from 'fs';

export default class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = [];
      this.productId = 1;
    }

    loadProducts() {
      try {
        const data = fs.readFileSync(this.path, 'utf8');
        this.products = JSON.parse(data);
      } catch (error) {
        this.products = [];
      }
    }

    saveProducts() {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data, 'utf8');
    }
  
    addProduct(product) {
      // Campos obligatorios
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.log("Error: Todos los campos son obligatorios");
        return;
      }
  
      // Campo "code" no esté repetido
      if (this.products.some(p => p.code === product.code)) {
        console.log("Error: El código ya existe");
        return;
      }
  
      // Agrega el producto al arreglo con un id autoincrementable
      product.id = this.productId;
      this.products.push(product);
      this.productId++;

      this.saveProducts(); // Guardar los productos en el archivo
      console.log('Producto agregado correctamente');
    }

    updateProduct(id, updatedProduct) {
      const productIndex = this.products.findIndex(p => p.id === id);
    
      if (productIndex === -1) {
        console.log("Producto no encontrado");
        return;
      }
    
      this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };
      this.saveProducts(); // Guardar los productos en el archivo
      console.log('Producto actualizado correctamente');
    }
    
    deleteProduct(id) {
      const productIndex = this.products.findIndex(p => p.id === id);
    
      if (productIndex === -1) {
        console.log("Producto no encontrado");
        return;
      }
    
      this.products.splice(productIndex, 1);
      this.saveProducts(); // Guardar los productos en el archivo
      console.log('Producto eliminado correctamente');
    }
    
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
  
      if (product) {
        return product;
      } else {
        console.log("Not found");
      }
    }
  }
 
const productManager = new ProductManager('product.json');

  /* 
  // Ejemplo
 
  
  // Agregar productos
  productManager.addProduct({
    title: 'Producto A',
    description: 'Descripción del producto A',
    price: 15000,
    thumbnail: 'ruth/productoA.jpg',
    code: '001',
    stock: 5
  });
  
  productManager.addProduct({
    title: 'Producto B',
    description: 'Descripción del producto B',
    price: 1000,
    thumbnail: 'ruth/imagenB.jpg',
    code: '002',
    stock: 3
  });
  

 
  // Obtener todos los productos
  const allProducts = productManager.getProducts();
  console.log(allProducts);
  
  // Obtener producto por id
  const productById = productManager.getProductById(1);
  console.log(productById);
  
  const nonExistentProduct = productManager.getProductById(3); // Producto no existente*/