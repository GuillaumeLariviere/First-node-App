
const BaseModel = require("./baseModel.model");

class Motif_product extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    // quantity = 0; a ajouter
    product_id = 0;
    motif_id = 0;
}
module.exports =Motif_product;