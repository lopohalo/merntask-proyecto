import { useContext } from "react";
import listadoContext from "../../context/listado/listadoContext";
import proyectoContext from "../../context/proyectos/proyectoContext";





const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    const listadosContext = useContext(listadoContext)
    const { conectartareasConProyectos } = listadosContext


    const SucesosDelClick = id => {
        proyectoActual(id)
        conectartareasConProyectos(id)
    }

   
    return ( 
        <li>
            <button
            type="button"
            className="btn btn-blank"
            onClick={() => SucesosDelClick(proyecto._id)}
           
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;