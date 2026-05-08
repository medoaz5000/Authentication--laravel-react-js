import { RouterProvider } from 'react-router-dom'
import './App.css'
import { Router } from './router/router'
import { ContextProvider } from './contexts/contextprovider'
function App() {
  

  return (
    <>
      <ContextProvider>
        <RouterProvider router={Router} />
      </ContextProvider>
    </>
  )
}

export default App
