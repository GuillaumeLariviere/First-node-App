const {append} = require ("express/lib/response");
const BaseRouter = require("./base.router");

// const Router = require('express').Router;
// const controllers = require('../controllers');

class DbRouter extends BaseRouter{

    constructor(){
        // this.router = Router();
        // this.name = this.constructor.name.replace(`Router`,``);
        // this.table = this.name.toLowerCase();
        // this.controller = new controllers[this.table]();
        super(false);
        this.table =this.name.unCamelize();

        this.initializeRoutes();
    }

    initializeRoutes = () => {

        // GET / talbe get ALL
        this.router.get('/', async (req, res) => {
            const data = await this.controller.getAll();
            res.send(data);
        })
        
        // GET /table/:id getOne
        this.router.get('/:id',async (req, res) => {
            const data = await this.controller.getOne(req.params.id);
            res.send(data);
        })

        
        this.router.post('/', async (req, res) => {
            // res.send(`create new ${this.table} row with values : ${JSON.stringify(req.body)}`);
            const data = await this.controller.insertOneOrMany(req.body);
            res.send(data)
        })
        
        this.router.put('/:id',async (req, res) => {
            const params = {...req.body, where:`id=${req.params.id}`};
            const data = await this.controller.updateWhere(params);
            res.send(data)
        })
        
        this.router.patch('/:id',async (req, res) => {
            // const params = {deleted: "1", where:`id=${req.params.id}`}
            const data = await this.controller.softDeleted(req.params.id);
            res.send(data)
        })

        this.router.patch('/',async (req, res) => {
            const data = await this.controller.updateWhere(req.body);
            res.send(data)
        })
        
        this.router.delete('/:id',async (req, res) => {
            const data = await this.controller.hardDeleted(req.params.id);
            res.send(data)
        })
    }
    
}

module.exports = DbRouter;