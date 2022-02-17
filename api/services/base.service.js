const mysql = require("mysql");
const dbConfig = require("../configs")("db");

class BaseService {

    constructor() {
        this.name = this.constructor.name.replace(`Service`, ``);
        this.table = this.name.toLowerCase();
    }

    static db;
    static #connect = () => {
        if (!BaseService.db) {
            BaseService.db = mysql.createPool({
                host: dbConf.HOST,
                // port: dbConf.PORT,
                user: dbConf.USER,
                password: dbConf.PASS,
                database: dbConf.NAME
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
            sql += ` AND (${params.where.replaceAll('&&','AND').replaceAll('||','OR')})`;
        }
        sql+=";";

        const rows = await BaseService.#query(sql);
        return rows;
    }

    getOne = async (id) => {
        const sql = `SELECT * FROM ${this.table} WHERE deleted=0 AND id=${id}`;
        const rows = await BaseService.#query(sql);
        return rows.length == 1 ? rows.pop() : null
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
                if(isNaN(fields[rows][key])){
                    values+=`'${fields[rows][key].replace("'","''")}',`;
                }
                else{
                    values+=`'${fields[rows][key]}',`;
                }
            }

            columns = columns.substring(0, columns.length - 1);
            values = values.substring(0, values.length - 1);

            const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
            const rows = await BaseService.#query(sql);
            return rows;
        }

    }

    // insertOneOrMany = async (params) => {
    //     if(Array.isArray(params)){//INSERT MANY ROWS

    //     }
    //     else{//INSERT ONE ROW
    //         const columns = Object.keys(params).join(',');
    //         let values = Object.values(params);
    //         values = values.map(val => {
    //             return val = ('"' + val.replace('"','\"') + '"')
    //         });// `'${val.replace("'","\'")}'`);
    //         values = values.join(',')
    //         let sql = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
    //         const result = await BaseService.executeQuery(sql);
    //         console.log(result);
    //         let row = null;
    //         if(result.affectedRows === 1){
    //             row = await this.selectOne(result.insertId);
    //         }
    //         return row;
    //     }

    // }

    // updateOne = async (id, fields) => {
    //     let set = "";
    //     for (let key in fields) {
    //         set += `${key}='${fields[key]}',`;
    //     }
    //     set = set.substring(0, set.length - 1);
    //     const sql = `UPDATE ${this.table} SET ${set} WHERE id=${id}`;
    //     const row = await BaseService.#query(sql);
    //     return row;
    // }
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

}

module.exports = BaseService;