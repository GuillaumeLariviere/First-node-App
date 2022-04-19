// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class App_user extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasOneToo("App_user")
        this.hasOne("Role");
    }

    email = "";
    password = "";
    active = false;
    role_id = 0;

}
module.exports =App_user;