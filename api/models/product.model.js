// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Product extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasOne("Category")
        .hasManyThrough("Command","Command_product");
    }

    title = "";
    price = 0;
    description = "";
    image = "";
    category_id = 0;
    gender_id = 0;

}
module.exports = Product;