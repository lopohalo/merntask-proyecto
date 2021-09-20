const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const { validationResult } = require('express-validator')

exports.crearTarea = async (req, res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()})
    }
   

    try {

      const { proyecto } = req.body;
      

      const SiElExisteproyecto = await Proyecto.findById(proyecto);
      if(!SiElExisteproyecto){
        return res.status(404).json({ msg: 'Proyecto no encontrado' })
      }

      if(SiElExisteproyecto.creador.toString() !== req.usuario.id ) {
        return res.status(401).json({ msg: 'No Autorizado ' })
    }

      const tarea = new Tarea(req.body);
      await tarea.save();
      res.json({ tarea })


    } catch (error) {
        res.status(500).send('hubo un error')
    }

}

exports.obtenerTareas = async (req, res) => {

  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.query;


    const existeProyecto = await Proyecto.findById(proyecto);
    if(!existeProyecto) {
        return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if(existeProyecto.creador.toString() !== req.usuario.id ) {
        return res.status(401).json({msg: 'No Autorizado'});
    }

    // Obtener las tareas por proyecto
    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
    res.json({ tareas });
    

} catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
}

}

exports.actualizarTarea = async (req, res) => {
 

  try {

    const{ proyecto, nombre, estado } = req.body;

    let tareaExiste = await Tarea.findById(req.params.id);

    if(!tareaExiste) {
      return res.status(404).json({ msg: 'No existe esa tarea' })
    }

    const SiElExisteproyecto = await Proyecto.findById(proyecto);

    if(SiElExisteproyecto.creador.toString() !== req.usuario.id ) {
      return res.status(401).json({ msg: 'No Autorizado ' })
    }
    
    const nuevaTarea = {};
    nuevaTarea.nombre = nombre,
    nuevaTarea.estado = estado
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {new: true })

    res.json({ tarea })

  } catch (error) {
      res.status(500).send('hubo un error')
  }

}


exports.eliminarTarea = async (req, res) => {
 

  try {

    const{ proyecto } = req.query;
    

    let tareaExiste = await Tarea.findById(req.params.id);
  
    if(!tareaExiste) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' })
    }

    const SiElExisteproyecto = await Proyecto.findById(proyecto);

    if(SiElExisteproyecto.creador.toString() !== req.usuario.id ) {
      return res.status(401).json({ msg: 'No Autorizado ' })
    }
    
    
    await Tarea.findOneAndRemove({_id: req.params.id})
    res.json({msg: 'Tarea Eliminada'})
   

  } catch (error) {
      res.status(500).send('hubo un error')
  }

}

