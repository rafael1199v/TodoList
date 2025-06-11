import Button from '../components/Button';
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"


function Home() {

  const auth = useAuthContext();
  const navigate = useNavigate();

  return (
    <div>
      Home
      <h2>Bienvenido { auth.session.user.email } </h2>  
      <Button name={"Crear tarea"} onClick={() => navigate('/tasks/create')}/>
    </div>
  )
}

export default Home