import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { ExperienceSection } from './components/ExperienceSection'
import { EducationSection } from './components/EducationSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { LanguagesBar } from './components/LanguagesBar'
import { Footer } from './components/Footer'
import { OpenHutsPage } from './components/OpenHutsPage'
import { MoodleNetPage } from './components/MoodleNetPage'
import { ReservePage } from './components/ReservePage'
import { ReserveFullScreenPage } from './components/ReserveFullScreenPage'
import { ClathesPage } from './components/ClathesPage'
import { Pix4DPage } from './components/Pix4DPage'
import { WegawPage } from './components/WeGawPage'
import { PomocaPage } from './components/PomocaPage'
import CVPage from './components/CVPage'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return JSON.parse(saved)
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <BrowserRouter>
      <AppContent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </BrowserRouter>
  )
}

// Separate component to use useLocation hook
function AppContent({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Hide header on CV page for print/download and on reserve-app for fullscreen */}
      {location.pathname !== '/cv' && location.pathname !== '/reserve-app' && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <EducationSection />
            <LanguagesBar />
            <ContactSection />
            <Footer />
          </>
        } />
        <Route path="/openhuts" element={<OpenHutsPage />} />
        <Route path="/moodlenet" element={<MoodleNetPage />} />
        <Route path="/reserve" element={<ReservePage />} />
        <Route path="/reserve-app" element={<ReserveFullScreenPage />} />
        <Route path="/clathes" element={<ClathesPage />} />
        <Route path="/pix4d" element={<Pix4DPage />} />
        <Route path="/wegaw" element={<WegawPage />} />
        <Route path="/pomoca" element={<PomocaPage />} />
        <Route path="/cv" element={<CVPage />} />
      </Routes>
    </div>
  )
}

export default App