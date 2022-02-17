// const AuthController = require("../controllers/auth.controller");
const BaseRouter = require("./base.router");
// const Router = require('express').Router;


class App_userRouter extends BaseRouter{
    
    // constructor(){
    //     this.router = Router();
    //     this.initializeRoutes();
    // }

    // initializeRoutes =()=>{

    //     this.router.post('/', async (req, res) => {
    //         const data = await new AuthController().login(req.body);
    //         res.send(data);
    //     })
    //     this.router.put('/', async (req,res) =>{
    //         const data = await new AuthController().register(req.body);
    //         res.send(data);
    //     })
    // }
}

module.exports = App_userRouter;