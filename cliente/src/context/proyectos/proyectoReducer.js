import {    
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTO,
    AGREGAR_PROYECTO,
    ERROR_PROYECTO, 
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    ALERTA_PROYECTO
} from "../../types";


export default (state, action) => {
    switch(action.type) {
      
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTO:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorFormularioIncompleto: false
            }

        case ERROR_PROYECTO:
            return {
                ...state,
                errorFormularioIncompleto: true
            }   

        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload )
            }   
                
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }
          
        case ALERTA_PROYECTO:
            return{
                ...state,
                payload: action.payload
            }    
        default:
    return  state;
    }
}