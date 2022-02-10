// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Customer extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Command");
        this.hasOneToo("Appuser");
    }

    fullname = "";
    email = "";

}
module.exports = Customer;