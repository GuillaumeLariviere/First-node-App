// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Motif extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Product")
        .hasManyThrough("Color","Motif_color")
        .hasManyThrough("Product_reference","Motif_product_reference");

    }

    name = "";
    img_path = "";
  


}
module.exports =Motif;