// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Appuser extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasOne("Customer");
    }

    login = "";
    password = "";
    is_active = false;
    customer_id = 0;

}
module.exports =Appuser;