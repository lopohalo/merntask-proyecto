import React, { Fragment, useContext } from 'react'
import listadoContext from '../../context/listado/listadoContext'
import proyectoContext from '../../context/proyectos/proyectoContext'
import Tarea from './Tarea'
import { CSSTransition, TransitionGroup} from 'react-transition-group'



    const ListadoTareas = () => {

        const contextproyectos = useContext(proyectoContext)
        const {proyecto, eliminarProyecto} = contextproyectos

        const contextlistados = useContext(listadoContext)
        const {listadoTareas } = contextlistados

        if(!proyecto) return <h2>Selecciona un proyecto</h2>;

        const [proyectoActual]= proyecto

        const eliminar = () => {
            eliminarProyecto(proyectoActual._id)
        } 


    return (
       <Fragment>
           <h2>Proyecto: {proyectoActual.nombre}</h2>
           <ul className="listado-tareas">
               {listadoTareas.length === 0 
                ? (<li className="tarea"><p>No hay Tareas</p></li>)
                :
                <TransitionGroup>
                {listadoTareas.map((tarea, index) => (
                    <CSSTransition
                        key={index}
                        timeout={200}
                        classNames="tarea"
                    >
                        <Tarea
                            key={index}
                            tarea={tarea}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
            }
               
           </ul>
           <button 
           type="button"
           className="btn btn-eliminar"
           onClick={eliminar}
           >Eliminar Proyecto</button>
       </Fragment>
    )
}

export default ListadoTareas;
