import React, { Fragment, useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext)
    const  { formulario, errorFormularioIncompleto, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    const [proyecto, setProyecto] = useState({ 
        nombre: ''
    });

    const { nombre } = proyecto;
     
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }
    const EnviarProyectos = e => {
        e.preventDefault();

        if(nombre === ''){
            mostrarError()
            return
        }
        agregarProyecto(proyecto)

        setProyecto({
            nombre: ''
        })
    }



    return ( 
        <Fragment>
            <button 
             type="button" 
             className="btn btn-block btn-primario"
             onClick= {() => mostrarFormulario()}
            >Nuevo Proyecto</button>

        { formulario ? 
            (
                <form
                className="formulario-nuevo-proyecto"
                onSubmit={EnviarProyectos}
                >
                <input 
                type="text"
                className="input-text"
                placeholder="Nombre Proyecto"
                name="nombre"
                value={nombre}
                onChange={onChangeProyecto}
                />

                <input 
                type="submit"
                className="btn btn-primario btn-block"
                value="Agregar Proyecto"
                />

                </form>
            )
            : null
        }

        {errorFormularioIncompleto ? <p className="mensaje error">El nombre del proyecto es OBLIGATORIO</p> : null}

        </Fragment>
     );
}
 
export default NuevoProyecto;

