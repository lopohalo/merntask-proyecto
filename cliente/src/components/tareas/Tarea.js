import React, { useContext } from 'react'
import listadoContext from '../../context/listado/listadoContext'
import proyectoContext from '../../context/proyectos/proyectoContext'


const Tarea = ({tarea}) => {

  const contextproyectos = useContext(proyectoContext)
  const {proyecto} = contextproyectos

  const tareasContext = useContext(listadoContext)
  const { seleccionarTarea, eliminarTarea, conectartareasConProyectos, actualizarTarea} = tareasContext

 

 const [proyectoActual] = proyecto;

   
  const EliminarUnaTarea = id => {
    eliminarTarea(id, proyectoActual._id)
    conectartareasConProyectos(proyectoActual._id)
  }

  const cambiarestado = tarea => {
    if(tarea.estado) {
      tarea.estado = false;
  } else {
      tarea.estado = true
  }
  actualizarTarea(tarea);
  }

  const selecciona = tarea => {
    seleccionarTarea(tarea)
  }



    return (
       <li className="tarea sombra">
           <p>{tarea.nombre}</p>
           <div className="estado">
              {tarea.estado 
              ? 
                  (

                      <button 
                        type="button" 
                        className="completo"
                        onClick={() => cambiarestado(tarea)}
                      >Completo</button>

                  )

              : 

                    (
              
                      <button
                        type="button"
                        className="imcompleto"
                        onClick={() => cambiarestado(tarea)}
                      >Imcompleto</button>
                    )
              }
           </div>
           <div className="acciones">
               <button
                type="button"
                className="btn btn-primario "
                onClick={ () => selecciona(tarea) }
               >Editar</button>
               <button
                 type="button"
                 className="btn btn-secundario"
                 onClick={() => EliminarUnaTarea(tarea._id) }
               >Eliminar</button>
           </div>
       </li>
    )
}

export default Tarea;