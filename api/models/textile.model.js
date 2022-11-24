
const BaseModel = require("./baseModel.model");

class Textile extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasManyThrough("Color","Textile_color")
        .hasManyThrough("Product","Textile_product")
    }

    name = "";
    price =0;
}
module.exports =Textile;