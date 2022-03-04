const { mongooseLib } = require('../../config/mongodb_config.js');
const ControladorCarrito = require('../controlador/ControladorDaoCarrito.js');
mongoose = mongooseLib;

const { mailTo } = require('../negocio/mailHandler');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: String,
    password: String,
    email: String,
    age: String,
    address: String,
    phone: String,
    picture: String,
    carritoid: String
}, {collection: 'user'});

const UserModel = mongoose.model('UserModel', userSchema);

const carritoController = new ControladorCarrito();


class User {

    constructor() {
      this.db = process.env.DB;
    }
  
    async find(id) {
  
      return await UserModel.findById(id);
  
    }
  
    async findAll() {
  
      return await UserModel.find()
          .then((docs) => {
            return docs;
          });
  
    }
  
    async create(data) {

			const carrito = await carritoController.create();

      const doc = new UserModel({
        nombre: data.nombre,
        password: data.password,
        email: data.email,
        age: data.age,
        address: data.address,
        phone: data.phone,
        picture: data.picture,
        carritoid: carrito._id.toString()
      });

      // Enviar mail
      mailTo({
        to: process.env.ADMIN_MAIL,
        subject: 'Nuevo Registro',
        message: `<div>Usuario creado: 
          Nombre: ${data.nombre} <br>
          Email: ${data.email} <br>
          Edad: ${data.age} <br>
          Dirección: ${data.address} <br>
          Teléfono: ${data.phone} <br>
        </div>`
      })

      await doc.save();
      return doc;
  
    }
  
    async update(data) {
  
      let updated = {};
      await ProductModel.findByIdAndUpdate(data.id, data).then(doc => updated = doc);
      return updated;
  
    }
  
  };


module.exports = { User};
