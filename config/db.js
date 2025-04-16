const mongoose = require('mongoose');
const colors = require("colors");
 const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected To Database${mongoose.connection.host} `);
    }
    catch(error){
        console.log("DB ERror", error)
    }
}

module.exports = connectDb; 
