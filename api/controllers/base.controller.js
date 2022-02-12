const services = require('../services');

class BaseController {

    constructor(){

        this.name = this.constructor.name.replace(`Controller`,``);
        this.table = this.name.toLowerCase();
        this.service = new services[this.table]();
    
    }

    getAll = async () => {

        const result = await this.service.getAll();
        return result;

    }

    getOne = async (id) => {
        const result = await this.service.getOne(id);
        return result;
    }
    insertOne = async (fields) =>{
        const result = await this.service.insertOne(fields);
        return result;
    }
    

}

module.exports = BaseController;