import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";


const RutaPrivado = ({ component: Component, ...props }) => {

    const AuthContext = useContext(authContext)
    const {autenticado, cargando, usuarioAutenticado} = AuthContext

    useEffect(() => {
      usuarioAutenticado()
    }, [])

    return(
        <Route {...props} render={props => !autenticado && !cargando ? (
          <Redirect to="/"/>
        ): (
         <Component {...props} />
        )}/>
    )
}

export default RutaPrivado;  