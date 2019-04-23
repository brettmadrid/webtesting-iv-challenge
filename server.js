const express= require("express")
const server=express();
//const db= require("./data/dataHelpers.js")
server.use(express.json());
server.get('/',async(req,res)=>{
  res.status(200).json({api:'up and running'})
})

module.exports=server