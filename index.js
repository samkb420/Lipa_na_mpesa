const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const mpesaRoutes = require('./routes/mpesa-routes');
const port = process.env.PORT;

const mogoose = require('mongoose');

// app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

mogoose.connect(process.env.DB,{
    useNewurlparser: true,
    useCreateindex: true,
     
})
.then(() => {
    console.log("connected succesifully");
})
.catch((err) => console.log(err));

app.get('/',(req,res) =>{
    res.send("working");
});


app.use('/api/v1',mpesaRoutes.routes);

app.listen(port,() => {
    console.log(`Aplication is runing on: http://localhost: ${port}`);
});