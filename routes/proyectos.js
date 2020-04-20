const express = require('express')
const router = express.Router()
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
const {check}  = require('express-validator')


//crea proyectos
// api/proyectos 
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyectos
)


//obtener todos los proyectos
router.get('/',
    auth, 
    proyectoController.obtenerProyectos
)

//actualizar proyecto va ID
router.put('/:id',
    auth,
    [
        check('nombre' , 'el nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizaProyecto
)

//eliminar un proyecto
router.delete("/:id",
    auth,
    proyectoController.eliminarProyecto
    )
module.exports = router