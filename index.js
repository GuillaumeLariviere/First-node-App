const express = require("express");
const router = express.Router();

const app = express();

const cors = require("cors");
const corsOption ={
    origin :["http://localhost:3000"]
};
app.use(cors(corsOption));

app.use(router);

router.route("/")
.get((req, res) =>{
    console.log("GET /");
    res.send((req.method + req.path));
})
.post((req ,res)=>{
    res.send((req.method + req.path));
});

router.route("/test").get((req, res) => {
    res.send((req.method + req.path));
});

router.route("/contactscreen").get((req, res) => {
    console.log((req.method + req.path));
    res.send("ok");
    
});
const PORT =5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
});
