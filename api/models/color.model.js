const BaseModel = require("./baseModel.model");

class Color extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Product")
        .hasManyThrough("Motif","Motif_color")
        .hasManyThrough("Textile","Textile_color");
    }

    name = "";
    //may be code rgb //
  


}
module.exports =Color;