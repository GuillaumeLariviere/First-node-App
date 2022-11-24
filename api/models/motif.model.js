
const BaseModel = require("./baseModel.model");

class Motif extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasManyThrough("Product","Motif_product")
    }

    name = "";
    img_path="";
}
module.exports =Motif;