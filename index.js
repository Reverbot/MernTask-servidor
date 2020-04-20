const express =  require('express')
const conectarDB = require('./config/db')
const cors = require('cors')

//creamos el servidor'

const app = express()

//conectar a la base de datos
conectarDB()

//habilitar cors
app.use(cors())

//habilitar express.json()
app.use(express.json({extenden : true}))
    
//puerto del  app
const PORT = process.env.PORT || 4000

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))



//arrancar el app
app.listen(PORT, () => {
    console.log(`en linea en el puerto ${PORT}`)
})