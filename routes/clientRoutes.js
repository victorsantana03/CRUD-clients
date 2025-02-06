import { Router } from "express";
const router = Router()

import Client from "../models/Client.js";

//ADICIONAR CLIENTES
router.post('/', async(req, res)=> {
    const {nome, email, fidelizado} = req.body

    const client = {
        nome,
        email,
        fidelizado
    }

    try {
        const clienteExistente = await Client.findOne({email}) //VERIFICAÇÃO DE EMAIL JÁ EXISTENTE
        if(clienteExistente){
            res.status(400).json({message:"Já existe um cliente com esse email."})
            return
        }
        await Client.create(client)
        res.status(200).json({message: 'Cliente inserido no banco'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//LISTAR CLIENTES
router.get('/', async(req, res)=>{
    try {
        const client = await Client.find()
        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({error: error})
    }
})
//LISTAR CLIENTES POR ID
router.get('/:id', async(req, res)=>{
    const id = req.params.id

    try {
        const client = await Client.findOne({_id: id})
        if(!client){
            res.status(422).json({message: 'Cliente não encontrado'})
            return
        }
        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//ATUALIZAR CLIENTES
router.patch('/:id', async(req,res)=>{
    const id = req.params.id

    const {nome, email, fidelizado} = req.body
    const client = {
        nome,
        email,
        fidelizado
    }

    try {
        const updateClient = await Client.updateOne({_id: id}, client)
        if(updateClient.matchedCount === 0){
            res.status(422).json({message:"O usuário não foi encontrado"})
            return 
        }
        res.status(200).json({ message: "Cliente atualizado com sucesso!", client })
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//DELETAR CLIENTES
router.delete('/:id', async(req,res)=>{
    const id = req.params.id

    try {
        const client = await Client.findOne({_id: id})

        if(!client){
            res.status(422).json({message: 'Cliente não encontrado.'})
            return
        }

        await Client.deleteOne({_id: id})
        res.status(200).json({message: 'Cliente deletado.', client})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

export default router