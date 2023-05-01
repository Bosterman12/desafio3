
import express from 'express'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import { __dirname, __filename } from './path.js'
import multer from 'multer'
import { engine } from 'express-handlebars'
import * as path from 'path'

const app = express()
const PORT = 4000
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
}) 

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
const upload = (multer({storage:storage}))



console.log(__dirname)

app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use( '/' ,express.static(__dirname + '/public'))
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("imagen subida")
})


app.get('/', (req, res) => {
    const tutor = {
        nombre: "Luciana",
        email: "lu@lu.com",
        rol: "Tutor"
    }

    const cursos = [
        { numero: 123, nombre: "Programacion Backend", dia: "LyM", horario: "Noche" },
        { numero: 456, nombre: "React", dia: "S", horario: "Mañana" },
        { numero: 789, nombre: "Angular", dia: "MyJ", horario: "Tarde" }
    ]

    res.render('home', {//Primer parametro indico la vista a utilizar
        titulo: "51225 Backend",
        mensaje: "Hola, buenos dias",
        user: tutor,
        isTutor: tutor.rol === "Tutor",
        cursos: cursos
        
    })
})



app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})