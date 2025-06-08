import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"
import AuthService from '../services/AuthService';


function Home() {

  const auth = useAuthContext();
  const navigate = useNavigate();

  return (
    <div>
      Home
      <h2>Bienvenido { auth.session.user.email} </h2>
      <button onClick={() => {
        AuthService.SignOut();
        navigate("/signin");
      }}
        className="cursor-pointer"
      >
        Cerrar sesión  
      </button>  
    </div>
  )
}

export default Home