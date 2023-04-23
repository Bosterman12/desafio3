
import express from 'express'
import productRouter from './routes/products.routes.js'
import { __dirname, __filename } from './path.js'
import multer from 'multer'

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

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const upload = (multer({storage:storage}))



console.log(__dirname)

app.use('/api/product', productRouter)
app.use( '/static' ,express.static(__dirname + '/public'))
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("imagen subida")
})








app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})