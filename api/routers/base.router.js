const Router = require('express').Router;

class BaseRouter{

    constructor(){
        this.router = Router();
        this.name = this.constructor.name.replace(`Router`,``);
        this.table = this.name.toLowerCase();

        this.initializeRoutes();
    }

    initializeRoutes = () => {

        // /category ou /gender
        this.router.get('/',(req, res) => {
            res.send(`get all rows of ${this.table}`);
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