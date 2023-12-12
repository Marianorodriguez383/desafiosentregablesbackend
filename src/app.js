import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars'
import path from 'path';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartsRoutes.js';
import { __dirname } from './utils.js';


const PORT = 8080;
const app = express();
const server = createServer(app);
const io = new Server(server);


// Configuración para uso de motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')



// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname,'public')));

// Middleware para parsear JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor express activo en el puerto ${PORT}`);
});

// Rutas
app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);
app.get('/realtimeproducts', (req, res) => {
  res.render('layouts/realTimeProducts'); //realTimeProducts.handlebars
});


// Conectar Socket.IO
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Eventos relacionados con los sockets aquí

  socket.on('addProduct', (product) => {
    console.log('Evento addProduct recibido:', product);
    // ------- Lógica agregar el producto
    io.emit('productAdded', product); // Emitir evento a todos los clientes
  });



  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});





























/*import express from 'express';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartsRoutes.js';
import { __dirname } from './utils.js';

const PORT = 8080;

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor express activo en el puerto ${PORT}`);
});*/

/*import express from "express"; 
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

*/


