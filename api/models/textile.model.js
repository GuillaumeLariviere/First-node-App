// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Textile extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Product")
        .hasManyThrough("Color","Textile_color")
        .hasManyThrough("Product_reference","Textile_product_reference");

    }

    name = "";
  


}
module.exports =Textile;