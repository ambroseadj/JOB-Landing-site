import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import  userRoutes from './routes/users.js'



const app= express();
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());


app.get('/',(req,res) => {
res.send("This is an API")

})


app.use('/user',userRoutes)



app.post('auth/signup')




const PORT= process.env.PORT || 5000

const CONNECTION_URI="mongodb+srv://ambrose:aj208125@stacky-1.dx65ect.mongodb.net/"



mongoose.connect(CONNECTION_URI,{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => app.listen(PORT,() => {console.log(`server running on port  ${PORT}`)}))
.catch((err) => console.log(err.message))


