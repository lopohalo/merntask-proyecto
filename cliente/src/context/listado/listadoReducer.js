import { 
    ACTUALIZAR_TAREA,
    AGREGAR_TAREA, 
    EDITAR_TAREA, 
    ELIMINAR_TAREA, 
    ERROR_TAREA, 
    ESTADO_TAREA, 
    TAREAS_PROYECTO 
} from "../../types";


export default (state, action) => {
    switch(action.type) {
      
        case TAREAS_PROYECTO:
            return {
                ...state,
                listadoTareas: action.payload,
                tareaseleccionada: null,
                errorTarea: null
            }

        case AGREGAR_TAREA:
            return {
                ...state,
                listadoTareas: [ ...state.listadoTareas ,action.payload ]
            }
            
        case ERROR_TAREA:
            return { 
                ...state,
                errorTarea: true
            }    
        
        case ELIMINAR_TAREA:
            return {
                ...state,
              listadoTareas: state.listadoTareas.filter(tarea => tarea._id !== action.payload)
            }  
        
            case ACTUALIZAR_TAREA:
            return {
                ...state,
                listadoTareas: state.listadoTareas.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
                tareaseleccionada: null
            }    

        case EDITAR_TAREA:
            return {
                ...state,
                tareaseleccionada: action.payload
            }    
        
        default:
    return  state;
    }
}