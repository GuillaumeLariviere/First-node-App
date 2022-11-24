
const BaseModel = require("./baseModel.model");

class Police_product extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    // quantity = 0; a ajouter
    product_id = 0;
    police_id = 0;
}
module.exports =Police_product;