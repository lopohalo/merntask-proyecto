import { useReducer } from 'react'
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {    AGREGAR_PROYECTO, 
            FORMULARIO_PROYECTO,
            OBTENER_PROYECTO,
            ERROR_PROYECTO,
            PROYECTO_ACTUAL, 
            ELIMINAR_PROYECTO,
            ALERTA_PROYECTO
     } from '../../types'
import clienteAxios from '../../config/axios'
    
     const ProyectoState = props => {

         const initialState = {
             proyectos: [],
             formulario: false,
             errorFormularioIncompleto: false,
             proyecto: null,
             mensaje: null
             
             
         }
        
         const [state, dispatch] = useReducer(proyectoReducer, initialState)

         const mostrarFormulario = () => {
             dispatch({
                 type: FORMULARIO_PROYECTO
             })
         }


         const obtenerProyectos = async() => {
            try {
                const resultado = await clienteAxios.get('/api/proyectos')
                
                dispatch({
                    type: OBTENER_PROYECTO,
                    payload: resultado.data.proyectos
                   })
            } catch(error){
                const alerta = {
                    msg: 'hubo un error',
                    categoria: 'alerta-error'
                }
                dispatch({
                    type: ALERTA_PROYECTO,
                    payload: alerta
                })
            }
         }

          const agregarProyecto = async proyecto => {
             try {

               const resultado = await clienteAxios.post('/api/proyectos', proyecto)
               
               dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
               })
            } catch (error) {
                const alerta = {
                    msg: 'hubo un error',
                    categoria: 'alerta-error'
                }
                dispatch({
                    type: ALERTA_PROYECTO,
                    payload: alerta
                })
             }

          }

          const mostrarError = () => {
            dispatch({
                type: ERROR_PROYECTO,
               
            })

          }

          const proyectoActual = proyectoId => {
            dispatch({
                type: PROYECTO_ACTUAL,
                payload: proyectoId
            })
        }
          
           const eliminarProyecto = async proyectoid => {
              try{
                   await clienteAxios.delete(`/api/proyectos/${proyectoid}`)
                dispatch({
                    type: ELIMINAR_PROYECTO,
                    payload: proyectoid
                })

              }catch (error){
                const alerta = {
                    msg: 'hubo un error',
                    categoria: 'alerta-error'
                }
                dispatch({
                    type: ALERTA_PROYECTO,
                    payload: alerta
                })
              }
           }

         return (
             <proyectoContext.Provider 
              value={{
                  proyectos: state.proyectos,
                  formulario: state.formulario,
                  errorFormularioIncompleto: state.errorFormularioIncompleto,
                  proyecto: state.proyecto,
                  mensaje: state.mensaje,
                  mostrarFormulario, 
                  obtenerProyectos,
                  agregarProyecto,
                  mostrarError,
                  proyectoActual,
                  eliminarProyecto
                 
              }}
             >
                 {props.children}
             </proyectoContext.Provider>
         )
     }
     
     export default ProyectoState;
     