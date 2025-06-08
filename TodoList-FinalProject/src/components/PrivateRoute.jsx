import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'


function PrivateRoute({ redirectTo }) {
  const auth = useAuthContext();
  
  if(auth.loading)
    return <div>Cargando sesión</div>

  if(auth.session == null)
    return <Navigate to={redirectTo} />

  return (
    <Outlet />
  )
}

export default PrivateRoute