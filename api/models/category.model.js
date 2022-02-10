// import BaseModel from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Category extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Product");
    }

    title = "";
    description = "";
    image = "";

}
module.exports = Category;