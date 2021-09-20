import React, { useContext, useEffect, useState } from 'react'
import listadoContext from '../../context/listado/listadoContext';
import proyectoContext from '../../context/proyectos/proyectoContext';


const FormTarea = () => {

    const poryectosContext = useContext(proyectoContext)
    const { proyecto } = poryectosContext
   
    const tareasContext = useContext(listadoContext)
    const { tareaseleccionada, agregarTarea, validarTarea, errorTarea, conectartareasConProyectos, actualizarTarea } = tareasContext

    useEffect(() => {
       if(tareaseleccionada !== null ){
          setnombre(tareaseleccionada)
       } else {
           setnombre({
               nombre: ''
           })
       }
    }, [tareaseleccionada])

    const [ tarea, setnombre ] = useState({
        nombre: ''
    });
    const { nombre } = tarea;
    
    
    if(!proyecto) return null;
    const [proyectoActual] = proyecto;

    
    const handleChange = e => {
       setnombre({
           ...tarea,
           [e.target.name] : e.target.value
       })
    }

    const onSubmit = e => {
        e.preventDefault()
        if(nombre.trim() === '' ){
          validarTarea()
          return
        } 

        if(tareaseleccionada === null ){
            tarea.proyecto = proyectoActual._id
            agregarTarea(tarea)
        } else {
            actualizarTarea(tarea)
          
        }
        conectartareasConProyectos(proyectoActual._id)
        setnombre({
            nombre: ''
        })
    }
    
    return (
        <div className="formulario">
            <form 
             onSubmit= {onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                      type="text"
                      className="input-text"
                      placeholder="Nombre Tarea..."
                      name="nombre"
                      value={nombre}
                      onChange={handleChange}
                    />

                </div>
                <div className="contenedor-input">
                    <input 
                      type="submit"
                      className="btn btn-primario btn-submit btn-block"
                      value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El Nombre De La Tarea Es Obligatiorio</p> :null}
        </div>
    )
}

export default FormTarea;
