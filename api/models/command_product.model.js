// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");
class Command_product extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    // quantity = 0; a ajouter
    product_id = 0;
    command_id = 0;

}
module.exports = Command_product;