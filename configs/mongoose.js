const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/polling-system')



const db = mongoose.connection


db.on('error',console.error.bind(console,"error connecting to mongoDB"))



db.once('open',()=>{
    console.log("connected to database")
})




module.exports = db;