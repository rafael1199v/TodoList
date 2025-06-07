import React, { useState } from 'react'
import todoIcon from '../assets/todo.svg'
import { Link } from "react-router-dom"
import SignUpService from '../services/SignUpService';
import Alert from './Alert';
import ValidationForm from '../services/validation/ValidationForm';
import SignUpFormValidator from '../services/validation/strategies/SignUpFormValidator';

function SignUp() {

  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const validate = () => {
    const validator = new ValidationForm(new SignUpFormValidator());
    const formErrors = validator.validate(user);
    const existErrors = Object.keys(formErrors).length !== 0;

    if(existErrors)
      setErrors(formErrors);
    else
      setErrors(null);

    return !existErrors;
  }

  const signUp = async (event) => {
    event.preventDefault();
    
    if(!validate()) {
      return;
    }
    
    try {
      await SignUpService.signUp(user);
      setMessage({
        title: "Operación existosa",
        message: "Se ha creado correctamente la cuenta",
        type: "success"
      });
    }
    catch(error) {
      setMessage({
        title: "Operación fallida",
        message: error.message,
        type: "danger"
      })
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
            Registrar cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={signUp}>
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Repetir Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="repeat-password"
                  name="repeat-password"
                  type="password"
                  required
                  placeholder='Repetir contraseña'
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                  onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                  autoComplete="new-password"
                />

                { errors && errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:bg-amber-200"
              >
                Registrarse
              </button>
            </div>
          </form>

          <div className="mt-5">
            {message && (
              <Alert title={message.title} message={message.message} type={message.type}/>
            )}
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Ya tienes una cuenta? {' '}   
            <Link to="/signin" className="font-semibold text-orange-600 hover:text-orange-500">
                Inicia sesión
            </Link>
          </p>

          
        </div>
      </div>
    </>
  )
}

export default SignUp