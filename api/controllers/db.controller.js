const BaseController = require("./base.controller");

class DbController extends BaseController {

    constructor(){
        super(false);
        
        this.table = this.name.unCamelize();
        const ServiceClass= require(`../services/${this.name.unCamelize()}.service`);
        this.service = new ServiceClass;
        this.initializeAction();
    }

    initializeAction=()=>{
        this.getAll = async (params) => {

            const result = await this.service.getAll(params);
            return result;
    
        }
    
        this.getOne = async (id) => {
            const result = await this.service.getOne(id);
            return result;
        }
        this.insertOneOrMany = async (fields) =>{
            const result = await this.service.insertOneOrMany(fields);
            return result;
        }
    
        // updateOne = async(id, fields)=>{
        //     const result = await this.service.updateOne(id, fields);
        //     return result;
        // }
        
        this.updateWhere =async(fields)=>{
            const result = await this.service.update(fields);
            return result;
        }
    
        this.softDeleted = async(id)=>{
            const result = await this.service.softDeleted(id);
            return result;
        }
        this.hardDeleted = async(id)=>{
            const result = await this.service.hardDeleted(id);
            return result;
        }
    }
   


}

module.exports = DbController;