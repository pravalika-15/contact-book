const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser');
const path = require('path')


// console logs msgs for every request
app.use(morgan('tiny'))

// parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))

// set view engine 
app.set("view engine", "ejs")



app.get('/', (req,res) => {
    res.render("index.ejs")
})


app.listen(3000, () => {
    console.log("hello again")
})