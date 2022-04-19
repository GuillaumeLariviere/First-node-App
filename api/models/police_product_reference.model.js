const BaseModel = require("./baseModel.model");
class Police_product_reference extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    // quantity = 0; a ajouter
    police_id = 0;
    product_reference_id = 0;

}
module.exports = Police_product_reference;