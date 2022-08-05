const BaseModel = require("./baseModel.model");

class Color_product_reference extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    // quantity = 0; a ajouter
    color_id = 0;
    product_reference_id = 0;

}
module.exports = Color_product_reference;