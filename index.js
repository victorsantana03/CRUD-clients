import 'dotenv/config' //.ENV
import express from "express"
import mongoose from "mongoose"
import clientRoutes from "./routes/clientRoutes.js" //ARQUIVO .JS DAS ROTAS
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/clientes', clientRoutes) //ATRIBUINDO A ROTA CLIENTES A TODAS AS ROTAS DO ARQUIVO

app.get('/clientes', (req, res)=>{
    return res.json({msg:'conectado'})
})

//ARQUIVO .ENV
const DB_USER = process.env.DB_USER 
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.nk8ll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
).then(() =>{
    console.log("conectado com sucesso!")
    app.listen(4000)
}).catch((erro) =>{
    console.log(erro)
})

