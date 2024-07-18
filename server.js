require('dotenv').config();
const express=require('express');
const appServer=express();
const mongoose=require('mongoose');
const router = require('./router/router');
const authRouter = require('./router/authRouter');
const cors=require('cors');
const port=process.env.PORT||5500;

appServer.use(express.urlencoded({extended:true}))

appServer.use(cors());

appServer.use(authRouter);
appServer.use(router);
mongoose.connect(process.env.DB_URL)
.then(res=>{
    appServer.listen(port,()=>{
        console.log(`Server and Database connected Successfully at http://localhost:${port}`);
    })
})
.catch(err=>{
    console.log('Database not connected Successfully',err);
})