import express from 'express'
import axios from "axios"
import bodyParser from 'body-parser';

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.get("/", (req,res)=>{
   res.render("index.ejs");
    
});
app.post("/submit",async (req,res)=>{
    try{
        let crypto = req.body["crypto"];
        let fiat = req.body["fiat"];
        let qty = req.body["qty"];
        const info = await axios.get(`https://api.blockchain.com/v3/exchange/tickers/${crypto}-${fiat}`);
        const result = info.data;
        console.log();
        res.render("index.ejs",{result,qty:qty,crypto:crypto,fiat:fiat});
    }
    catch(error){
        res.status(404).send(error.message);
    }
     
 });

app.listen(3000);