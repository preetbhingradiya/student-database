const mongoose=require('mongoose')

const connect=async()=>{

    await mongoose.connect("mongodb+srv://preetbhingradiya6:node-js@cluster0.zoupwet.mongodb.net/?retryWrites=true&w=majority")

    console.log("connect to database");
}

module.exports=connect