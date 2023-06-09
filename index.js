

const express=require("express")
const {conncetion} =require("./config/db")


const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/notes.routes")
const cors=require("cors")
require("dotenv").config()


const app=express()
app.use(express.json())

app.use(cors())



 app.use("/users",userRouter)
app.use("/notes",noteRouter)


app.listen(process.env.port,async()=>{
    try {
        await conncetion
        console.log("server has conceted to DB")
    } catch (error) {
        console.log(error)
    }
})