import React, { useState } from 'react'
import todoIcon from '../assets/todo.svg'
import { Link, useNavigate } from 'react-router-dom'
import ValidationForm from '../services/validation/ValidationForm'
import SignInFormValidator from '../services/validation/strategies/SignInFormValidator';
import AuthService from '../services/AuthService';
import Alert from './Alert'
import { useAuthContext } from '../context/AuthContext';


function SignIn() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const validate = () => {
    const validator = new ValidationForm(new SignInFormValidator());
    const formErrors = validator.validate(user);

    const existErrors = Object.keys(formErrors).length !== 0;
    setErrors((existErrors ? formErrors : null));

    return !existErrors;
  }

  const signIn = async (event) => {
    event.preventDefault();

    if(!validate())
      return;

    try {
      const data = await AuthService.SignIn(user);
      auth.setSession(data.session);
      navigate("/")
    }
    catch(error) {
      console.error(error);
      setMessage({
        title: "Operación fallida",
        message: error.message,
        type: "danger"
      });
    }
    finally {
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }

  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Todo List"
            src={todoIcon}
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Inicio de sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={signIn}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Correo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder='Direccion de correo'
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  autoComplete="username"
                />

                 { errors && errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder='Contraseña'
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  autoComplete="new-password"
                />

                 { errors && errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <div className="mt-5">
            {message && (
              <Alert title={message.title} message={message.message} type={message.type}/>
            )}
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            No tienes una cuenta? {' '}   
            <Link to="/signup" className="font-semibold text-orange-600 hover:text-orange-500">
                Registrate
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn