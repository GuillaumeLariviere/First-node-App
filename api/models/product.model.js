const BaseModel = require("./baseModel.model");

class Product extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Product_option")
        .hasMany("Product_image")
        .hasManyThrough("Police","Police_product")
        .hasManyThrough("Motif","Motif_product")
        .hasManyThrough("Textile","Textile_product")
        .hasManyThrough("Command","Command_product")
    }
    // text ="";
    name = "";
    price = 0.00;

}
module.exports = Product;