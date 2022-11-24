
const BaseModel = require("./baseModel.model");

class Color extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasManyThrough("Police","Police_color")
        .hasManyThrough("Textile","Textile_color")
    }

    name = "";
    img_path="";
    price =0;
}
module.exports =Color;