const BaseModel = require("./baseModel.model");

class Product_reference extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasOne("Category");
        this.hasMany("Product_image");
        this.hasMany("Product")
        .hasManyThrough("Textile","Textile_product_reference")
        .hasManyThrough("Motif","Motif_product_reference")
        .hasManyThrough("Color","Color_product_reference")
        .hasManyThrough("Police","Police_product_reference");
    }

    name = "";
    description = "";
    category_id = 0;

}
module.exports = Product_reference;