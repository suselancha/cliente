import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import Auth from './pages/Auth';
import { useEffect, useState, useMemo } from 'react';
import { getToken, decodeToken } from './utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routes/Navigation';

export default function App() {

  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    //console.log(token);
    if(!token) {
      setAuth(null);
    } else {
      //Al recargar la pagina
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    console.log("Cerrar sesión");
  };

  const setUser = (user) => {
    //console.log(user);
    setAuth(user)
  }

  //Compara los datos anteriores con los nuevos.
  //Si no hay cambios no se renderiza el componente
  //Disponible a traves del hook useAuth
  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }),
    [auth] //Se recarga cuando auth sufra cambios
  );

  //Soluciona el flash al recargar pagina
  //Evita mostrar por medio segundo el login
  //Ocurria porque por defecto auth=undefined y tiene que ser null o tener un valor
  if(auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData} >
        {!auth ? <Auth /> : <Navigation />}
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}