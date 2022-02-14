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

    updateOne = async(id, fields)=>{
        const result = await this.service.updateOne(id, fields);
        return result;
    }

    softDeleted = async(id)=>{
        const result = await this.service.softDeleted(id);
        return result;
    }
    hardDeleted = async(id)=>{
        const result = await this.service.hardDeleted(id);
        return result;
    }

}

module.exports = BaseController;