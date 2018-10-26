// server.js


const Sequelize = require('sequelize');

const sequelize = new 
Sequelize('mysql://root:mysql@localhost:3306/coins');


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Productos = sequelize.define('productos', {
	codigo: {
	  type: Sequelize.INTEGER
	},
	nombre: {
		type: Sequelize.STRING
	},
	precio: {
		type: Sequelize.FLOAT
	},
	exist: {
		type: Sequelize.FLOAT
	  }
  });
  

// call the packages

var express = require('express')
var cors = require('cors')
var app = express();
app.use(cors())

var bodyParser = require('body-parser');

// config app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8081; 

// routes for our api
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('something is happen..');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();  // make sure we go to the next routes
});


// test route

router.get('/', function(req, res) {
 res.json({ message: 'yahoo!! welcome to our api !' });
});

// more routes for our API will happen here
router.route('/products')
 
  // create a product accessed at POST
  // http://localhost:8080/api/products
  
 .post(function (req, res) {
 
	 return Productos
	 .create({ 
		 				codigo: req.body.codigo, 
						nombre: req.body.nombre, 
						precio: req.body.precio, 
						exist : req.body.exist 
					})
					.then(todoItem => res.status(201).send(todoItem))
					.catch(error => res.status(400).send(error));
	})
  
 // get all the devices (accessed at 
 // http://localhost:8080/api/products
 .get(function (req, res) {
    Productos.findAll().then(products => {
	   	res.json(products);
	  })
 });

// on routes that end in /products/:product_id
router.route('/products/:product_id')
 // get the device with that id 
 // accessed at GET 
 // http://localhost:8080/api/products/:product_id

 .get(function(req, res) {
	
	return Productos
    .findById(req.params.product_id, {
    })
    .then(myproduct => {
      if (!myproduct) {
        return res.status(404).send({
          message: 'Product Not Found',
        });
      }
      return res.status(200).send(myproduct);
    })
    .catch(error => res.status(400).send(myproduct));
	})

 // update the product with this id
 // accessed at PUT
 // http://localhost:8080/api/products/:product_id

 .put(function (req, res) {
	 return Productos
    .findById(req.params.product_id, {
    })
    .then(myproduct => {
      if (!myproduct) {
        return res.status(404).send({
          message: 'Product Not Found',
        });
      }
      return myproduct
        .update({
					codigo: req.body.codigo || myproduct.codigo,
                  			nombre: req.body.nombre || myproduct.nombre,
					precio: req.body.precio || myproduct.precio,
					exist:  req.body.exist || myproduct.exist
        })
        .then(() => res.status(200).send(myproduct))  // Send back the updated product.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
})

 // delete the product with this id 
 // accessed at DELETE
 // http://localhost:8080/api/products/:product_id
 .delete(function (req, res) {
	return Productos
    .findById(req.params.product_id)
    .then(myproduct => {
      if (!myproduct) {
        return res.status(400).send({
          message: 'Product Not Found',
        });
      }
      return myproduct
        .destroy()
        .then(() => res.status(200).send({ message: 'Product deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));

	
 });

 // register our routes
app.use('/api', router);
//app.use(require('cors')());

// start the server
app.listen(port);
console.log('Magic happens on port: ' + port);
