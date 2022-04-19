const BaseModel = require("./baseModel.model");
class Textile_product_reference extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    // quantity = 0; a ajoute
    textile_id = 0;
    product_reference_id = 0;

}
module.exports = Textile_product_reference;