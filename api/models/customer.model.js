// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Customer extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Command");
        this.hasOne("App_user");
    }

    name = "";
    last_name = "";
    adresse = "";
    phone = "";
    app_user_id = "";

}
module.exports = Customer;