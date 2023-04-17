/*import http from 'http'

const PORT = 4000

const server = http.createServer((request, response) => {
    response.end("Hola, este es mi primer servidor con Node")
})

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})*/

import express from 'express'
import {ProductManager} from './productmanager.js'

const productManager = new ProductManager('info.txt')


const app = express()

app.use(express.urlencoded({extended:true}))

const PORT = 4000

const users = [
    {
        id: 1,
        nombre:"Pedro",
        rol:"Tutor"
    },{
        id: 2,
        nombre:"Analia",
        rol:"Profesor"
    },{
        id: 3,
        nombre:"Emily",
        rol:"Tutor"
    }
]

app.get('/user',(req,res) => {
    let{nombre,rol} = req.query
    const usuarios = users.filter(user => user.rol === rol)
    res.send(JSON.stringify(usuarios))
})


app.get('/user/:id', (req, res) => {
    const user = users.find(usuario => usuario.id === parseInt(req.params.id))
    if(user){
        res.send(`El usuario con el id ${req.params.id} se llama ${user.nombre} `)
    }else{
        res.send(`El usuario con el id ${req.params.id} no se encuentra `) 
    }
    
})

app.get('/product', async (req,res) => {
    let{limit} = req.query
    const products = await productManager.getProducts()
    res.send(JSON.stringify(products))
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})