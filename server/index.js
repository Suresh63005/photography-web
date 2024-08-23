const express = require('express')
const cors =require('cors')
const mongoose= require('mongoose')
const bodyparser = require("body-parser");
require('dotenv').config()


const app =express()

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials:true
}))

app.use(bodyparser.json());
app.use(bodyparser());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true 
}));



const PORT = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.json({
        message :"server runnning at " + PORT
    })
})

mongoose.connect(process.env.MANGODB_URI).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server running at : ${PORT}`)
        console.log("Db Connected")
    })
})


// usage of routes

app.use('/auth', require('./Route/RegisterRoute'))
app.use('/file', require('./Route/FileRoute'))
app.use('/contactus', require('./Route/ContactusRoute'))








