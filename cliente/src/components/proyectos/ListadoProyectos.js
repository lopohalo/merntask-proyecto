import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import Proyecto from './Proyecto';
import { CSSTransition, TransitionGroup} from 'react-transition-group'
import alertaContext from '../../context/alertas/alertaContext';


const ListadoProyectos = () => {
      
    
      const AlertaContext = useContext(alertaContext);
      const { alerta, mostrarAlerta } = AlertaContext;

     const proyectosContext = useContext(proyectoContext);
     const {proyectos,mensaje, obtenerProyectos } = proyectosContext;
   
    useEffect(() => {
       if(mensaje){
        mostrarAlerta(mensaje.msg, mensaje.categoria)
       }
        obtenerProyectos()
     }, [])
    

   if(proyectos.length === 0 ) return <p>No hay proyectos, ¡Animate a crear uno!</p>;

    return ( 
        <ul className="listado-proyectos">
          { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
            {proyectos.map(proyecto => (
                <CSSTransition
                 key={proyecto._id}
                 timeout={200}
                 classNames="proyecto"
                >
                <Proyecto 
                 
                 proyecto={proyecto}
                />
                </CSSTransition>
              
            ))}
              </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;