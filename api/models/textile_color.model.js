
const BaseModel = require("./baseModel.model");

class Textile_color extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        delete this.id;
    }

    // quantity = 0; a ajouter
    color_id = 0;
    textile_id = 0;
}
module.exports =Textile_color;