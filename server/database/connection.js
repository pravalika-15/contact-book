const mongoose = require('mongoose');

const mongodb = async() => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useFindAndModify:false,
            // useCreateIndex:true
        })

        console.log("mongodb connected")
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = mongodb;