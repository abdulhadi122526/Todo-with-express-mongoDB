import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./src/db/index.js"


import todoRoutes from "./src/routes/todo.routes.js"
const app = express()
const port = 3000

dotenv.config()
app.use(express.json())
app.use(cors())


app.use("/api/v1" , todoRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


connectDB()
.then(()=>{

  app.listen(process.env.PORT , () => {
    console.log(`Server is running  at ${process.env.PORT}`)
  })
})
.catch((err) => {
  console.log("MONGO DB connection failed !!! ", err);
});