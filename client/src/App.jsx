import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'

const App = () => {
  const [toastPosition, setToastPosition] = useState(
    window.innerWidth >= 768 ? "bottom-right" : "top-center"
  )

  useEffect(() => {
    const handleResize = () => {
      setToastPosition(window.innerWidth >= 768 ? "bottom-right" : "top-center")
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-[#fafbfc]">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
          <Toaster position={toastPosition} reverseOrder={false} />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App