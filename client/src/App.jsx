import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-[#fafbfc]">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App