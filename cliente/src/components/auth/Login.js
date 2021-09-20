import React, { useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/auth/authContext';


const Login = (props) => {
    
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const {  mensaje, autenticado, iniciarSesion} = authContext;

    useEffect(() => {
         if(autenticado){
             props.history.push('/proyectos')
         }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
     
    }, [mensaje, autenticado, props.history])

    const [usuario, setusuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const onChange = e => {
      setusuario({
          ...usuario,
          [e.target.name] : e.target.value
      })
    }
    
    const onSubmit = e => {
        e.preventDefault();
         if( email.trim() === '' || password.trim() === '' ) {
          mostrarAlerta('TODOS LOS CAMPOS SON OBLIGATORIOS', 'alerta-error')
         }
         iniciarSesion({email, password})
        
    }

    return ( 
        <div className="form-usuario">
             {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}   
            <div className="contenedor-form sombra-dark">
                <h1>iniciar Sesion</h1>
                <form 
                 onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                         type="email"
                         id="email"
                         name="email"
                         placeholder="Tu Email"
                         value={email}
                         onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">password</label>
                        <input 
                         type="password"
                         id="password"
                         name="password"
                         placeholder="Tu Password"
                         value={password}
                         onChange={onChange}
                        />
                    </div>
                    <div className="campo-form"> 
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesiòn"/>
                    </div>
                </form>
                <Link  to={'/nueva-cuenta'} className="enlace-cuenta" > Obtener Cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;