// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Message extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
    }

    user_email = "";
    message = "";


}
module.exports =Message;