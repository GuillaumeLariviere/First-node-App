const BaseModel = require("./baseModel.model");

class Product_option extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasOne("Product")
    }

    name = "";
    price = 0.00;
    product_id = 0;

}
module.exports = Product_option;