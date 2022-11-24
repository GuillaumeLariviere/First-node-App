
const BaseModel = require("./baseModel.model");

class Police extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasManyThrough("Product","Police_product")
    }

    name = "";
    img_path="";
}
module.exports =Police;