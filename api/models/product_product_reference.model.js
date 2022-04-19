const BaseModel = require("./baseModel.model");

class Product_product_reference extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    // quantity = 0; a ajouter
    product_id = 0;
    product_reference_id = 0;

}
module.exports = Product_product_reference;