import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { EducationSection } from './components/sections/EducationSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { ContactSection } from './components/sections/ContactSection'
import { LanguagesBar } from './components/ui/LanguagesBar'
import { Footer } from './components/layout/Footer'
import CVPage from './components/pages/CVPage'

// Lazy load project pages to reduce initial bundle size
const OpenHutsPage = lazy(() => import('./components/pages/OpenHutsPage').then(module => ({ default: module.OpenHutsPage })))
const MoodleNetPage = lazy(() => import('./components/pages/MoodleNetPage').then(module => ({ default: module.MoodleNetPage })))
const ReservePage = lazy(() => import('./components/pages/ReservePage').then(module => ({ default: module.ReservePage })))
const ReserveFullScreenPage = lazy(() => import('./components/pages/ReserveFullScreenPage').then(module => ({ default: module.ReserveFullScreenPage })))
const ClathesPage = lazy(() => import('./components/pages/ClathesPage').then(module => ({ default: module.ClathesPage })))
const Pix4DPage = lazy(() => import('./components/pages/Pix4DPage').then(module => ({ default: module.Pix4DPage })))
const WegawPage = lazy(() => import('./components/pages/WeGawPage').then(module => ({ default: module.WegawPage })))
const PomocaPage = lazy(() => import('./components/pages/PomocaPage').then(module => ({ default: module.PomocaPage })))

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
)

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
        <Route path="/openhuts" element={
          <Suspense fallback={<PageLoader />}>
            <OpenHutsPage />
          </Suspense>
        } />
        <Route path="/moodlenet" element={
          <Suspense fallback={<PageLoader />}>
            <MoodleNetPage />
          </Suspense>
        } />
        <Route path="/reserve" element={
          <Suspense fallback={<PageLoader />}>
            <ReservePage />
          </Suspense>
        } />
        <Route path="/reserve-app" element={
          <Suspense fallback={<PageLoader />}>
            <ReserveFullScreenPage />
          </Suspense>
        } />
        <Route path="/clathes" element={
          <Suspense fallback={<PageLoader />}>
            <ClathesPage />
          </Suspense>
        } />
        <Route path="/pix4d" element={
          <Suspense fallback={<PageLoader />}>
            <Pix4DPage />
          </Suspense>
        } />
        <Route path="/wegaw" element={
          <Suspense fallback={<PageLoader />}>
            <WegawPage />
          </Suspense>
        } />
        <Route path="/pomoca" element={
          <Suspense fallback={<PageLoader />}>
            <PomocaPage />
          </Suspense>
        } />
        <Route path="/cv" element={<CVPage />} />
      </Routes>
    </div>
  )
}

export default App