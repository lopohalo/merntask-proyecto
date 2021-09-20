import { useReducer } from 'react'
import listadoContext from './listadoContext'
import listadoReducer from './listadoReducer'
import {  
    ACTUALIZAR_TAREA,
    AGREGAR_TAREA,
    EDITAR_TAREA,
    ELIMINAR_TAREA,
    ERROR_TAREA,
    ESTADO_TAREA,
    TAREAS_PROYECTO,
   
    
     } from '../../types'
import clienteAxios from '../../config/axios'

     
     const ListadoState = props => {
         const initialState = {      
         listadoTareas: [],
         errorTarea: false,
         tareaseleccionada: null
        }
        
         const [state, dispatch] = useReducer(listadoReducer, initialState)

         const conectartareasConProyectos = async proyecto => {
            
            try {
                const resultado = await clienteAxios.get('/api/tareas',  {params: {proyecto}} );
               
                dispatch({
                    type: TAREAS_PROYECTO,
                    payload: resultado.data.tareas
                })
            } catch (error) {
                console.log(error);
            }
        }

        const agregarTarea = async tarea => {
           
            try {
                const resultado = await clienteAxios.post('../api/tareas', tarea);
                
                dispatch({
                    type: AGREGAR_TAREA,
                    payload: resultado.data.tarea
                })
            } catch (error) {
                console.log(error);
            }
        }
    

         const validarTarea = () => {
             dispatch({
                 type:  ERROR_TAREA
             })
         }

         const eliminarTarea = async (id, proyecto)=> {
           try{
              await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
              dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
           } catch (error){
            console.log(error)
           }
         }

         const actualizarTarea = async tarea => {
           try{
             const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
             dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
           } catch {

           }
        }

         const seleccionarTarea = tarea => {
             dispatch({
                 type: EDITAR_TAREA,
                 payload: tarea
             })
         }



    
         return (
             <listadoContext.Provider 
              value={{
               listadoTareas: state.listadoTareas,
               errorTarea: state.errorTarea,
               tareaseleccionada: state.tareaseleccionada,
               conectartareasConProyectos,
               agregarTarea,
               validarTarea,
               eliminarTarea,
               seleccionarTarea,
               actualizarTarea
                 
              }}
             >
                 {props.children}
             </listadoContext.Provider>
         )
     }
     
     export default ListadoState;