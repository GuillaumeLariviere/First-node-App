// import { BaseModel } from "./baseModel.model.js";
const BaseModel = require("./baseModel.model");

class Police extends BaseModel{

    constructor(props){
        super(props);
        this.assign(props);
        this.hasMany("Product")
        .hasManyThrough("Product_reference","Police_product_reference");
    }

    name = "";
}
module.exports =Police;