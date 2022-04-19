// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Product extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasOne("Police");
        this.hasOne("Color");
        this.hasOne("Textile");
        this.hasOne("Motif")
        .hasManyThrough("Command","Command_product")
        .hasManyThrough("Product_reference","Product_product_reference");
    }

    text = "";
    // price = 0; a ajouter
    police_id=0;
    motif_id=0;
    textile_id=0;
    color_id=0;

}
module.exports = Product;