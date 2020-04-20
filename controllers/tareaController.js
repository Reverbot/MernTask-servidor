const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator')

//crear una tarea
exports.crearTarea = async (req, res) => {

    //revisar si hay errores
    const errores  = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }

    

    try {
        //ezxtraer el proyecto y comprobar si existe
        const {proyecto} = req.body

        const existeProyecto = await Proyecto.findById(proyecto)

        if(!existeProyecto){
            res.status(404).json({msg : 'proyecto no encontrado'})
        }

        //revisar si el proyecto actual pertenece al usuario
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg : 'No autorizado'})
        }

        //creamos la tarea
        const tarea = new Tarea(req.body)

        await tarea.save()

        res.json({tarea})


        
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }
}

//obtener tareas oçpor usuario
exports.obtenerTareas = async (req, res) => {

    try {
        //ezxtraer el proyecto y comprobar si existe
        const {proyecto} = req.query

        const existeProyecto = await Proyecto.findById(proyecto)

        if(!existeProyecto){
            res.status(404).json({msg : 'proyecto no encontrado'})
        }

        //revisar si el proyecto actual pertenece al usuario
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg : 'No autorizado'})
        }

        //obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto})
        res.json({tareas })


    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }
}

//actualizar tarea
exports.actualizarTarea = async (req, res) => {

    try {
         //ezxtraer el proyecto y comprobar si existe
         const {proyecto, nombre, estado} = req.body
         
         //si la tarea existe
         let tarea = await Tarea.findById(req.params.id)

         if(!tarea) {
            return res.status(404).json({msg : 'no existe la tarea'})
         }

         const existeProyecto = await Proyecto.findById(proyecto)
 
         //revisar si el proyecto actual pertenece al usuario
         if(existeProyecto.creador.toString() !== req.usuario.id){
             return res.status(401).json({msg : 'No autorizado'})
         }

         //crear un objeto con la nueva informacion
         const nuevaTarea = {}

         nuevaTarea.nombre = nombre
         nuevaTarea.estado = estado
         
         //guardar tarea
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, {new : true})

        res.json({ tarea })
 
        
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }
}

//eliminar una tarea
exports.eliminarTarea = async (req, res) => {

    try {
        //ezxtraer el proyecto y comprobar si existe
        const {proyecto} = req.query
        
        //si la tarea existe
        let tarea = await Tarea.findById(req.params.id)

        if(!tarea) {
           return res.status(404).json({msg : 'no existe la tarea'})
        }

        const existeProyecto = await Proyecto.findById(proyecto)

        //revisar si el proyecto actual pertenece al usuario
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg : 'No autorizado'})
        }

        //eliminar
        await Tarea.findOneAndRemove({_id : req.params.id})
        res.json({msg : 'tarea eliminada'})

       
   } catch (error) {
       console.log(error)
       res.status(500).send('hubo un error')
   }

}