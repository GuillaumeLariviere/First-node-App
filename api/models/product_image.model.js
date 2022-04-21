const BaseModel = require("./baseModel.model");

class Product_image extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasOne("Product_reference");
    }

    img_path = "";
    product_reference_id = "";
}
module.exports = Product_image;