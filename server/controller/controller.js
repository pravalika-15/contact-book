var Userdb = require('../model/model')

// create a new contact 

exports.create = (req,res) => {
    if (!req.body){
        res.status(400).send({message:"content cannot be empty!"})
        return;
    }

    const user = new Userdb({
        name: req.body.name,
        number: req.body.number,
        relation: req.body.relation,
        address: req.body.address
    })
    console.log(req.body)

    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/')
        })
        .catch (err => {
            res.status(500).send({
                message:err.message || "error occurred"
            });
            console.log(user)
        });
}

// finding contacts
exports.find = (req,res) => {
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({message : err.message || "error occurred"})
    })
}


// find one contact 
exports.findone = (req,res) => {
    const id = req.params.id;
    Userdb.findById(id,req.body)
    .then(data => {
        if(!data){
            res.status(404).send({message: "cannot find the user"})
        } else {
            res.send(data)
            console.log(data)
        }
    })
    .catch(err => {
        res.status(500).send({message : err.message || "error occurred while retriving the data"})
    })
}

// to update existing contact
exports.update = (req,res) => {
    if (!req.body){
        res.status(400).send({message:"content cannot be empty!"})
    }

    const id = req.params.id;

    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data => {
        if(!data){
            res.status(404).send({ message: "cannot update the user"})
        } else {
            res.send(data)
            console.log(data)
        }
    })
    .catch(err => {
        res.status(500).send({message : "error!!"})
    })
}


// to delete existing contact
exports.delete = (req,res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message: "cannot delete the user"})
        } else {
            res.send({ message: "sucessfully deleted"})
        }
    })
    .catch(err => {
        res.status(500).send({message : "error!!"})
    })
    
}