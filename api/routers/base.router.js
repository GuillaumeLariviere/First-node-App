const Router = require('express').Router;
const controllers = require('../controllers');

class BaseRouter{

    constructor(){
        this.router = Router();
        this.name = this.constructor.name.replace(`Router`,``);
        this.table = this.name.toLowerCase();
        this.controller = new controllers[this.table]();

        this.initializeRoutes();
    }

    initializeRoutes = () => {

        // /category ou /gender
        this.router.get('/', async (req, res) => {
            const data = await this.controller.getAll();
            res.send(data);
        })
        
        // /category/1
        this.router.get('/:id',async (req, res) => {
            const data = await this.controller.getOne(req.params.id);
            res.send(data);
        })

        
        this.router.post('/', async (req, res) => {
            // res.send(`create new ${this.table} row with values : ${JSON.stringify(req.body)}`);
            const data = await this.controller.insertOne(req.body);
            res.send(data)
        })
        
        this.router.put('/:id',async (req, res) => {
            const data = await this.controller.updateOne(req.params.id,req.body);
            res.send(data)
        })
        
        this.router.patch('/:id',async (req, res) => {
            const data = await this.controller.softDeleted(req.params.id);
            res.send(data)
        })
        
        this.router.delete('/:id',async (req, res) => {
            const data = await this.controller.hardDeleted(req.params.id);
            res.send(data)
        })
    }
    
}

module.exports = BaseRouter;