// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Role extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("App_user")
    }

    name = "";
}
module.exports =Role;