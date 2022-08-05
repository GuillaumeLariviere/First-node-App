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
            if(Object.keys(req.query).length > 0){
                Object.keys(req.query).map(async (params)=>{
                    if(params=="where"){
                        const json = JSON.stringify(req.query)
                        const strJson = json.replace(/[{-}]/g, '')
                        const data = await this.controller.getAll({where:strJson.replace(":","=")});
                        res.send(data);
                    }
                    else if(params=="with"){
                        const relations = Object.values(req.query).join()?.split(',');
                        const data = await this.controller.getAllWithRelation({with:relations});
                        res.send(data);
                    }  
                })
            }
            else{
                const data = await this.controller.getAll();
                res.send(data);
            }
            
        })
        // this.router.get('/productOption/:id', async (req, res)=>{
        //     // const data = await this.controller.getAllOption({where:req.params.id});
        //     const controllersNames = Object.values(req.query);
        //     controllersNames.map( async (controllerName)=>{
        //         const key = controllerName.toLowerCase();
        //         controllerName = new this.controller(controllerName);
        //         return await controllerName.getAll({where:`${key}_id ="${req.params.id}"`})
        //     })
        //     const data = "fetch is ok";
        //     res.send(data);
        // })
        
        // GET /table/:id getOne
        this.router.get('/:id',async (req, res) => {
            if(Object.keys(req.query).length > 0){
                Object.keys(req.query).map(async (params)=>{
                    if(params=="where"){
                        const json = JSON.stringify(req.query)
                        const strJson = json.replace(/[{-}]/g, '')
                        const data = await this.controller.getOne({where:strJson.replace(":","=")});
                        res.send(data);
                    }
                    else if(params=="with"){
                        const relations = Object.values(req.query).join()?.split(',');
                        const data = await this.controller.getOneWithRelation({with:relations},req.params.id);
                        res.send(data);
                    }  
                })
            }
            else{
                const data = await this.controller.getOne(req.params.id);
                res.send(data);
            }
            

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