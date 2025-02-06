import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    nome: String,
    email: String,
    fidelizado: Boolean
})

const Client = mongoose.model('Client', clientSchema)

export default Client