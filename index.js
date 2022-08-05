require("./api/helpers/string.helper");
require('./api/helpers/extenders');
require('./api/helpers/extenders.obfuscated');


const express = require("express");
const app = express();
app.use(express.json());

const cookieParser= require("cookie-parser");
app.use(cookieParser());

const routers = require('./api/routers');

const cors = require("cors");

const corsOption ={
    origin :["http://localhost:3000"],
    credentials:true
};
app.use(cors(corsOption));

for(const route in routers){
    app.use(`/${route}`, new routers[route]().router);
};

const config = require("./api/configs")("app");
app.listen(config.PORT, ()=>{
    console.log(`Server is running on port ${config.PORT}.`);
});
// app.use('*', (req,res)=> res.send(false));

// const PORT =5000;
// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT}.`);
// });
