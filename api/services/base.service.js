const mysql = require("mysql");
const dbConfig = require("../configs")("db");
const ModuleImporter =require("../helpers/moduleImporter.js") ;


class BaseService {

    constructor() {
        this.name = this.constructor.name.replace(`Service`, ``);
        this.table = this.name.toLowerCase();
        this.model =require(`../models/${this.name.unCamelize()}.model`);
        this.service = require(`../services/${this.name.unCamelize()}.service`)
    }

    static db;
    static #connect = () => {
        if (!BaseService.db) {
            BaseService.db = mysql.createPool({
                host: dbConfig.HOST,
                // port: dbConf.PORT,
                user: dbConfig.USER,
                password: dbConfig.PASS,
                database: dbConfig.NAME
            });
        }
        return BaseService.db;
    }

    static #query = async (sql) => {
        return await new Promise((resolve, reject) => {
            BaseService.#connect().query(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }

    getAll = async (params) => {
        let sql = `SELECT * FROM ${this.table} WHERE deleted=0`;
        if(params?.where){
            if(params.where.includes("&&")||params.where.includes("||")){
                sql += ` AND (${params.where.replaceAll('&&','AND').replaceAll('||','OR')})`;
            }
            else{
                const pararmsArr = params.where.split("=");
                const key = pararmsArr[0].replace(/"/g,'');
                const value = key+"="+pararmsArr[1];
                sql+= ` AND (${value})`;
            }
        }
        sql+=";";
        let rows = await BaseService.#query(sql);
        if(params?.predicate){
            rows = rows.filter(params.predicate)
        }
        // let models = await ModuleImporter.import(this.name);
        // rows = models.from(rows);
        const models = rows.map((row)=>{
            return  row = new this.model(row);
        });
        if(models.length == 0){
            return models;
        }
        for(const relation of this.relations){
            let item = models.last();
            if(item.hasOneTooRelations[relation]){
                const {fk, name} = item.hasOneTooRelations[relation];
                let Service = require(`../services/${relation.unCamelize()}.service`);
                let service = new Service();
                let relModels = await service.getAll();
                models.forEach(it => {
                    it[name] = relModels.find(row => row[fk] == it.id);
                });
                // debugger;
            }

            if(item.hasOneRelations[relation]){
                const {fk, name} = item.hasOneRelations[relation];
                let Service = require(`../services/${relation.unCamelize()}.service`);
                let service = new Service();
                let relModels = await service.getAll();
                models.forEach(it => {
                    it[name] = relModels.find(row => row.id == it[fk]);
                })
                //debugger;
            }

            if(item.hasManyRelations[relation]){
                const {fk, name} = item.hasManyRelations[relation];
                let Service =  require(`../services/${relation.unCamelize()}.service`);
                let service = await new Service();
                let relModels = await service.getAll();
                models.forEach(it => {
                    it[name] = relModels.filter(row => row[fk] == it.id);
                })
                //debugger;
            }

            if(item.hasManyThroughRelations[relation]){
                const {through, fk_model, fk, name} = item.hasManyThroughRelations[relation];
                let ThroughService = require(`../services/${through.unCamelize()}.service`);
                let throughService = new ThroughService();
                let throughmodels = await throughService.getAll();
                let Service = require(`../services/${relation.unCamelize()}.service`);
                let modelService = new Service();
                let relatedModels = await modelService.getAll();
                throughmodels.forEach(row => {
                    row[relation.toLowerCase()] = relatedModels.find(el => el.id == row[fk_model]);
                });
                models.forEach(it => {
                    it[name] = throughmodels.filter(el => el[fk] == it.id);
                });
                //debugger;
            }
        }
        return models;
        
    }

    getOne = async (id) => {
        const sql = `SELECT * FROM ${this.table} WHERE deleted=0 AND id=${id}`;
        const rows = await BaseService.#query(sql);
        const row = rows.length == 1 ? rows.pop() : null;
       
        if(row){
            const item = new this.model(row);
      
            for(let relation of this.relations){
                let specialRelation=false;
                if(relation.includes("|")){
                    let rel = relation.split("|");
                    relation = rel[0];
                    specialRelation=rel[1];
                }
                //todo make fonction to check
                if(item.hasOneTooRelations[relation]){
                    const {fk, name} = item.hasOneTooRelations[relation];
                    let Service = require(`../services/${relation.unCamelize()}.service`);
                    let service = new Service();
                    let models = await service.getAll({predicate:row => row[fk] == item.id});
                    item[name] = models.length == 1 ? models.pop() : null;
                    //debugger;
                }
    
                
                if(item.hasOneRelations[relation]){
                    const {fk, name} = item.hasOneRelations[relation];
                    let Service =  require(`../services/${relation.unCamelize()}.service`);
                    let service = new Service();
                    item[name] = await service.getOne(item[fk]);
                    // debugger;
                }
    
                if(item.hasManyRelations[relation]){
                    const {fk, name} = item.hasManyRelations[relation];
                    let Service =  require(`../services/${relation.unCamelize()}.service`);
                    let service = new Service();
                    item[name] = await service.getAll({predicate:row => row[fk] == item.id});
                    // debugger;
                }
    
                if(item.hasManyThroughRelations[relation]){
                    const {through, fk_model, fk, name} = item.hasManyThroughRelations[relation];
                    let ThroughService =  require(`../services/${through.unCamelize()}.service`);
                    let throughService = new ThroughService();
                    let throughItems = await throughService.getAll({predicate:row => row[fk] == item.id});
                    let modelIds = throughItems.map(row => row[fk_model]);
                    let Service =  require(`../services/${relation.unCamelize()}.service`);
                    let modelService = new Service();
                    let models;
                    if(specialRelation){
                        models = await modelService.with(specialRelation).getAll({predicate:row => modelIds.includes(row.id)});
                    }else{
                        models = await modelService.getAll({predicate:row => modelIds.includes(row.id)});
                    }
                    
                    throughItems.forEach(row => {
                        row[relation.toLowerCase()] = models.find(it => it.id == row[fk_model]);
                    })
                    item[name] = throughItems;
                    // debugger;
                }
            }
            return item;
        }
        else{
            return "bad request";
        }
        
      
    }

    insertOneOrMany = async (fields) => {
        let columns = "";
        let values = "";
        if (Array.isArray(fields)) {
          let firstRow =true;
        //   let globalArray =[];
         
          for (let rows in fields){
            values+="(";
              for(let key in fields[rows]){
                  if(firstRow){
                      columns+=key+","; 
                  }
                if(isNaN(fields[rows][key])){
                    values+=`'${fields[rows][key].replace("'","''")}',`;
                }
                else{
                    values+=`'${fields[rows][key]}',`;
                }
                  
              }
              firstRow=false;
              values = values.substring(0,values.length-1)+"),";
          }
          values = values.substring(0,values.length-1);
          columns = columns.substring(0,columns.length-1);
          const sql = `INSERT INTO ${this.table} (${columns}) VALUES ${values}`;
          const rows = await BaseService.#query(sql);
          console.log(rows);
        }
        else {
            for (let key in fields) {
                columns += key + ",";
                if(isNaN(fields[key])){
                    values+=`'${fields[key].replace("'","''")}',`;
                }
                else{
                    values+=`'${fields[key]}',`;
                }
            }

            columns = columns.substring(0, columns.length - 1);
            values = values.substring(0, values.length - 1);

            const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
            const rows = await BaseService.#query(sql);
            return rows;
        }

    }

    update =async (fields)=>{
        let where = params.where?.replaceAll('&&','AND').replaceAll('||','OR') || '1';
        delete fields.where;
        let set ="";
        for(let key in fields){
            set += `${key}='${fields[key]}',`;
        }
        set = set.substring(0, set.length - 1);
        const sql = `UPDATE ${this.table} SET ${set} WHERE ${where}`;
        const row = await BaseService.#query(sql);
        return row;
        
    }
    

    softDeleted = async (id) => {
        const sql = `UPDATE ${this.table} SET deleted="1" WHERE id=${id}`;
        const row = await BaseService.#query(sql);
        return "Soft deleted complited";
    }

    hardDeleted = async (id) => {
        const sql = `DELETE FROM ${this.table} WHERE id=${id}`;
        const row = await BaseService.#query(sql);

        return "HardDeleted complite";
    }
    with = (relation) => {
        if(!this.relations.includes(relation)){
            this.relations.push(relation);
            return this;
        }

    }
    relations = [];
}


module.exports = BaseService;