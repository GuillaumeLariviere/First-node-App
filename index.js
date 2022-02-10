const express = require("express");
const routers = require('./api/routers');
console.log('routers')

const app = express();

const cors = require("cors");
const corsOption ={
    origin :["http://localhost:3000"]
};
app.use(cors(corsOption));

app.use(express.json());

for(const route in routers){
    app.use(`/${route}`, new routers[route]().router);
}

const PORT =5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
});
