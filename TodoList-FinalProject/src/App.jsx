import { useState } from 'react'
import SignIn from './components/SignIn'
import Layout from './pages/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <SignIn />
      </Layout>
      
    </>
  )
}

export default App
