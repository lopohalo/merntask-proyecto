import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'
import tokenAuth from './config/tokenAuth';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';
import ListadoState from './context/listado/listadoState';
import ProyectoState from './context/proyectos/proyectoState';
import RutaPrivado from './components/rutas/RutaPrivada';


const token = localStorage.getItem('token')
if(token){
 tokenAuth(token)
}

function App() {
 return (   
    <ListadoState>
    <ProyectoState>
    <AlertaState>
    <AuthState>
          <Router>
            <Switch>
            <Route exact path="/" component={Login} />
              <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
              <RutaPrivado exact path="/proyectos" component={Proyectos} />
            </Switch>
          </Router>
          </AuthState>
    </AlertaState>
    </ProyectoState>
    </ListadoState>
  );
}

export default App;
