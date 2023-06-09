

const mongoose=require("mongoose")

require("dotenv").config()


const conncetion=mongoose.connect(process.env.mongoURL)


module.exports={conncetion}