const BaseController = require("./base.controller");

class DbController extends BaseController {

    constructor(){
        super(false);
        
        this.table = this.name.unCamilize();
        const ServiceClass= require(`../services/${this.name.unCamilize()}.service`);
        this.service = new ServiceClass;
        this.initializeAction();
    }

    initializeAction=()=>{
        getAll = async (params) => {

            const result = await this.service.getAll(params);
            return result;
    
        }
    
        getOne = async (id) => {
            const result = await this.service.getOne(id);
            return result;
        }
        insertOneOrMany = async (fields) =>{
            const result = await this.service.insertOneOrMany(fields);
            return result;
        }
    
        // updateOne = async(id, fields)=>{
        //     const result = await this.service.updateOne(id, fields);
        //     return result;
        // }
        
        updateWhere =async(fields)=>{
            const result = await this.service.update(fields);
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
   


}

module.exports = DbController;