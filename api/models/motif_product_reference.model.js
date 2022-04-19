const BaseModel = require("./baseModel.model");

class Motif_product_reference extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    // quantity = 0; a ajouter
    motif_id = 0;
    product_reference_id = 0;

}
module.exports = Motif_product_reference;