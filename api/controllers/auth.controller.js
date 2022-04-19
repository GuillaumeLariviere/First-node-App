const BaseController = require("./base.controller");
const MailerService = require('../services/mailer.service');
const UserService = require('../services/users.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appConfig = require("../configs")("app");


class AuthController extends BaseController{

    getUser = async(email) =>{
        const service = new UserService();
        const users = await service.getAll({where:`email = '${email}' && active='1'`});
        return users.length === 1 ? users.pop(): null;
    }

    login = async (req) =>{
        if(req.method !=='POST') return {status:405};

        const user = await this.getUser(req.body.email);
        if(user){
            const userPassword = user.password;
            const ToverifPass = req.body.password;
            const result = await bcrypt.compare(ToverifPass,`${appConfig.HASH_PREFIX + userPassword}`);
            if(result){
                const payload = {email: user.email, role:user.role,};
                const token = jwt.sign(payload, appConfig.JWT_SECRET, { expiresIn: '1d'});
                return {data:{completed:true, role:user.role ,message:`Bonjour ${user.email} !`,cookie:token,...payload, id:user.id}, cookie:token};
            }
        }
        return {data:{completed:false, message:"Identifiant ou mot de passe incorrect !"}};
    }

    register = async(req) => {
        if(req.method !== 'POST') return {status:405};

        const user = await this.getUser(req.body.email);

        if(!user){
            const payload ={email:req.body.email,role:1 , password:req.body.password};
            const token =jwt.sign(payload, appConfig.JWT_SECRET, { expiresIn: '1d' });
            
            const html = 
            `<b>Confirmer votre inscription</b>
                <a href ="http://localhost:3000/accountValidate?t=${encodeURIComponent(token)}" target ="_blank"> Confirmer </a>`;
            
           await MailerService.send({to: req.body.email, subject:"Confirmer votre inscription", html});
            return true;
        }
        return false;
    }

    crypt = async (req) =>{
        const payload ={email:req.body.email,role:1 , password:req.body.password};
        const password = (await bcrypt.hash(payload.password,10)).replace(appConfig.HASH_PREFIX,'');
        return {data:{password:password}};
    }

    validate = async (req) =>{
        if (req.method !== 'POST') return {status:405};

        const token = req.body.token;
        let payload;
        try{
            payload = jwt.verify(token, appConfig.JWT_SECRET);
        }
        catch{
            return {data:{completed:false, message:"Une erreur est survenue ...."}};
        }
        if(payload){
            const service = new UserService();
            const password = (await bcrypt.hash(payload.password,10)).replace(appConfig.HASH_PREFIX,'');
            const user = await service.insertOneOrMany({email:payload.email, password, role:payload.role});//modif possible
            return user ?
                {data:{completed:true, message:"Bienvenu sur shop_online, votre compte a bien etais activé, vous pouvez vous connecter"}} :
                {data:{completed:false, message:"Une erreur est survenue ...."}} ;
        }
        return {data:{completed:false, message:"L'activation de votre compte a expiré, réinscriver vous ..."}};
    }
    
    check = async (req) =>{
        if(req.method !=='GET') return {status:405};
        const auth = req.cookies.auth;
        if(auth){
            const result = jwt.verify(auth,appConfig.JWT_SECRET);
            if(result){
                return {data:{result:true, email:result.email, role:result.role}};
            }
        }
        return {data:{result:false, role:0}};
    }
   


}

module.exports = AuthController;