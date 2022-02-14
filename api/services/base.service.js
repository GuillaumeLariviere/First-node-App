const mysql =require("mysql");
const dbConf = require("../config/db.conf.js");

class BaseService {

    constructor(){
        this.name = this.constructor.name.replace(`Service`,``);
        this.table = this.name.toLowerCase();
    }

    static db;
    static #connect =()=>{
        if(!BaseService.db){
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
        return await new Promise((resolve,reject)=>{
            BaseService.#connect().query(sql, (err,rows)=>{
                if(err){
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }

    getAll = async () =>{
        const sql = `SELECT * FROM ${this.table}`;
        const rows = await BaseService.#query(sql);
        return rows;
    }

    getOne = async (id) =>{
        const sql = `SELECT * FROM ${this.table} WHERE id=${id}`;
        const rows = await BaseService.#query(sql);
        return rows.length == 1 ? rows.pop() : null
    }

    insertOne = async (fields) =>{
        let columns ="";
        let values ="";

        for (let key in fields){
            columns += key+",";
            values += `'${fields[key]}',`;
        }

        columns = columns.substring(0,columns.length-1);
        values = values.substring(0,values.length-1);

        const sql =`INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
        const rows = await BaseService.#query(sql);
        return rows;
    }

    updateOne = async (id , fields) =>{
        let set ="";
        for (let key in fields){
            set += `${key}='${fields[key]}',`;
        }
        set = set.substring(0,set.length-1);
        const sql =`UPDATE ${this.table} SET ${set} WHERE id=${id}`;
        const row = await BaseService.#query(sql);
        return row;
    }

    softDeleted = async(id)=>{
        const sql =`UPDATE ${this.table} SET deleted="1" WHERE id=${id}`;
        const row = await BaseService.#query(sql);
        return "Soft deleted complited";
    }

    hardDeleted =async (id)=>{
        const sql =`DELETE FROM ${this.table} WHERE id=${id}`;
        const row = await BaseService.#query(sql);

        return "HardDeleted complite";
    }

}

module.exports = BaseService;