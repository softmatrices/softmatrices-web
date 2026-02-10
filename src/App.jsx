import { HelmetProvider } from 'react-helmet-async'
import { useTheme } from './context/ThemeContext'
import SEO from './components/SEO'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Process from './components/Process'
import WhyChooseUs from './components/WhyChooseUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const { isDark } = useTheme()

  return (
    <HelmetProvider>
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0A0A0A] text-gray-200' : 'bg-white text-dark'}`}>
        <SEO />
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Process />
          <WhyChooseUs />
          <Contact />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App
