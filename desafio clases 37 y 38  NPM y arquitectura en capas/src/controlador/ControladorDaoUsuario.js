const { User } = require('../persistencia/userModel.js');

class ControladorUsuario {

    constructor(ruta) {
        this.ruta = ruta
        this.userModel = new User();
    }

    async listar(id) {

        return await this.userModel.find(id);

    }

    async listarAll() {

        return await this.userModel.findAll();

    }

    async createUser(data) {

        return await this.userModel.create(data);

    }

}

module.exports = ControladorUsuario