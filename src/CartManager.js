import {promises as fs} from "fs"

export class CartManager {
    constructor(path){
        
        this.path = path
        
        
        }  
        static incrementID(){
            if(this.idIncrement){
                this.idIncrement++
            }else{
                this.idIncrement = 1
            }
    
            return this.idIncrement
              }

    async createCarrito(){
        const cartsJson = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJson)
        const carrito = {
            id: CartManager.incrementID(),
            cantidad: []
        }
        
        carts.push(carrito)
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Carrito creado"
    }

    

    async getCartById(id){
        const cartsJson = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJson)
        if(carts.some(cart => cart.id === parseInt(id))){
            return carts.find(cart => cart.id === parseInt(id))
        }else{
            "Carrito no encontrado"
        }
    } 

    async addProductCart(id, quantity, idCart){
        const cartsJson = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJson)
        if( carrito= carts.find(cart => cart.id === parseInt(idCart))){
            //modificar la cantidad
        }else{
            //crear nuevo objeto con id y quantity y guardarlo en el carrito
        }
        // consultar el indice del carrito con findindex y modificarlo para guardarlo  en el txt
    }

        
    }