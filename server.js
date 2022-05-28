const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser');
const path = require('path')
const mongodb = require('./server/database/connection')
const controller = require("./server/controller/controller")
const axios = require("axios");
var Userdb = require('./server/model/model')


dotenv.config();
// console logs msgs for every request
app.use(morgan('tiny'))
app.use(bodyparser.json())
app.use(express.json());
// mongo db connection 
mongodb()

// parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))

// set view engine 
app.set("view engine", "ejs")
app.post('/api/contacts', controller.create)
app.get('/api/contacts', controller.find)
app.get('/api/contacts/:id', controller.findone)
app.put('/api/contacts/:id', controller.update)
// app.delete('/api/contacts/:id', controller.delete)


app.get('/', (req,res) => {
    res.render("index.ejs")
})

app.get('/addcontact', (req,res) => {
    res.render("add-contact.ejs")
})

app.get('/allcontacts', (req,res) => {
    axios.get("http://localhost:3000/api/contacts")
    .then(function(response){
        console.log(response)
        res.render("all-contacts.ejs", { users:response.data})
    })
    .catch(err => {
        res.send(err)
    })
    
})

app.get('/updatecontact', (req,res) => {
    axios.get(`http://localhost:3000/api/contacts/${req.query.id}`)
    .then (function(userdata){
        res.render("update-contact.ejs", {user: userdata.data})
    })
    .catch(err => {
        res.send(err)
    }) 

})

app.get('/getcontact', (req,res) => {
    axios.get(`http://localhost:3000/api/contacts/${req.query.id}`)
    .then(function(contact_data){
       res.render("contact.ejs", {data1:contact_data.data}) 
    })
    .catch(err => {
        res.send(err)
    })
})

// app.get('/delete', (req,res) => {
//     axios.delete
// })

app.get('/update/:id', async(req,res) => {

    await axios.put(`http://localhost:3000/api/contacts/${req.query.id}`)
    .then (function(userdata){
        res.send(userdata)
        res.redirect('/allcontacts')
    .catch(err => {
        res.send(err)
    }) 
}) 
}) 


    // const id = req.params.id;
    // // console.log(id)

    // await Userdb.findById(id,req.body, { new: true }, (err,data) => {
    //     if(!data){
    //         res.status(404).send({message: "cannot find the user"})
    //     }else {
    //         res.send(data)
    //     }
    // })

    // .then(data => {
    //     if(!data){
    //         res.status(404).send({message: "cannot find the user"})
    //     } else {
    //         // res.send(data)
    //         res.redirect('/allcontacts')
    //         console.log(data)
    //     }
    // })
    // .catch(err => {
    //     res.status(500).send({message : err.message || "error occurred while retriving the data"})
    // })



app.get('/delete/:id', async(req,res) => {
    const id = req.params.id;
    
    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message: "cannot delete the user"})
        } else {
            // res.send({ message: "sucessfully deleted"})
            res.render("index.ejs")
        }
    })
    .catch(err => {
        res.status(500).send({message : err})
    })
})


app.listen(3000, () => {
    console.log("hello again")
})