import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { AlertContextProvider } from './context/AlertContext'

function App() {

  return (
    <AuthContextProvider>
      <AlertContextProvider>
        <RouterProvider router={router} />
      </AlertContextProvider>
    </AuthContextProvider>
  )
}

export default App
