const express = require('express')
const router = express.Router()
const TareaController = require('../controllers/tareaController')
const auth = require('../middleware/auth')
const {check}  = require('express-validator')   


//crear una tarea
//api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    TareaController.crearTarea
)

//obtener tareas por proyecto

router.get('/',
    auth,
    TareaController.obtenerTareas
)

//actualizar tarea
router.put('/:id', 
    auth,
    TareaController.actualizarTarea
)

//eliminar una tarea
router.delete('/:id',
    auth,
    TareaController.eliminarTarea
)

module.exports = router