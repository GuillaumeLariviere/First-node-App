const Router = require('express').Router;
const controller = require('../controllers');

class BaseRouter{

    constructor(){
        this.router = Router();
        this.name = this.constructor.name.replace(`Router`,``);
        this.table = this.name.toLowerCase();
        this.controller = new controller[this.table]();

        this.initializeRoutes();
    }

    initializeRoutes = () => {

        // /category ou /gender
        this.router.get('/',(req, res) => {
            const data = this.controller.getAll();
            res.send(data);
        })
        
        // /category/1
        this.router.get('/:id',(req, res) => {
            res.send(`get ${this.table} row with id=${req.params.id}`);
        })

        
        this.router.post('/',(req, res) => {
            res.send(`create new ${this.table} row with values : ${JSON.stringify(req.body)}`);
        })
        
        this.router.put('/:id',(req, res) => {
            res.send(`update ${this.table} row with id=${req.params.id} with values : ${JSON.stringify(req.body)}`);
        })
        
        this.router.patch('/:id',(req, res) => {
            res.send(`soft delete ${this.table} row with id=${req.params.id}`);
        })
        
        this.router.delete('/:id',(req, res) => {
            res.send(`hard delete ${this.table} row with id=${req.params.id}`);
        })
    }
    
}

module.exports = BaseRouter;