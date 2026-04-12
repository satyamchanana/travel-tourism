import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import Booking from './pages/Booking'
import DestinationDetail from './pages/DestinationDetail'
import Packages from './pages/Packages'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import NotFound from './pages/NotFOund'
import { AuthProvider } from './context/AuthContext'
import Seed from './pages/Seed'
import { ThemeProvider } from './context/ThemeContext'
function App() {
  return (
   <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <FloatingButtons />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />

          {/* <Route path="/seed" element={<Seed />} /> */}

        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
   </ThemeProvider>
  )
}

export default App