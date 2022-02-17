const BaseController = require("./base.controller");
const MailerService = require('../services/mailer.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appConfig = require("../configs")("app");


class AuthController extends BaseController{


    login = async (params) =>{
        const app_userService= new App_userService();
        const users = await app_userService.getAll({where:`login = '${params.email}'`});
        if(users.length === 1){
            const user = users.pop();
            const userPassword = user.password;
            const ToverifPass = params.password;
            bcrypt.compare(ToverifPass, userPassword ,function(err,result){
                if(result){
                    return `bienvenue ${user.email}`;
                }
                else{
                    return " your email or mdp is incorrecte";
                }
            })

        }
    }
    register = async(params) => {
        const app_userService = new App_userService();
        params.password = bcrypt.hashSync(params.password, 10, function(err, hash) {
            console.log(hash)
        })
        params.user_role_id = 1
        const user = await app_userService.insertOneOrMany(params);
        return user;
  
         
        
    }
   


}

module.exports = AuthController;