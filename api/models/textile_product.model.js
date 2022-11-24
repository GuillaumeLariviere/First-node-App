
const BaseModel = require("./baseModel.model");

class Textile_product extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    // quantity = 0; a ajouter
    product_id = 0;
    textile_id = 0;
}
module.exports =Textile_product;