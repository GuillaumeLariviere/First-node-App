// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Command extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasOne("Customer");
        this.hasManyThrough("Product", "Command_product");
    }

    numero_command = 0;
    // validation_date = new Date(); a ajouter
    customer_id = 0;

}
module.exports= Command;