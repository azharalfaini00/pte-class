import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

// Sections
import { Hero } from './components/sections/Hero';
import { PlacementTest } from './components/sections/PlacementTest';
import { SuitableClass } from './components/sections/SuitableClass';
import { Roadmap } from './components/sections/Roadmap';
import { Programs } from './components/sections/Programs';
import { Results } from './components/sections/Results';
import { Tutors } from './components/sections/Tutors';
import { ClassDemo } from './components/sections/ClassDemo';
import { Testimonials } from './components/sections/Testimonials';
import { Calculator } from './components/sections/Calculator';
import { Advantages } from './components/sections/Advantages';
import { FAQ } from './components/sections/FAQ';
import { RegistrationForm } from './components/sections/RegistrationForm';

// Conversion Features
import { FloatingWhatsApp } from './components/conversion/FloatingWhatsApp';
import { StickyMobileCTA } from './components/conversion/StickyMobileCTA';
import { ExitIntentPopup } from './components/conversion/ExitIntentPopup';

// Header & Footer (existing ones, or simple placeholders if they break)
import Header from './components/Header';
import Footer from './components/Footer';

// Admin Dashboard
import { OwnerDashboard } from './components/admin/OwnerDashboard';
import { OwnerLogin } from './components/admin/OwnerLogin';

export default function App() {
  const [isOwnerMode, setIsOwnerMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    // Check if the URL has ?role=owner or #owner
    if (window.location.search.includes('role=owner') || window.location.hash.includes('owner')) {
      setIsOwnerMode(true);
    }

    const handleScroll = () => {
      const sections = ['beranda', 'keunggulan', 'kelas', 'testimoni', 'faq'];
      const scrollPosition = window.scrollY + 200; // offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Progress Bar Scroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (isOwnerMode) {
    if (!isAuthenticated) {
      return <OwnerLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
    }
    return <OwnerDashboard />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans overflow-x-hidden relative">
      
      {/* Progress Bar Scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Header */}
      <Header onNavClick={handleScrollToSection} activeSection={activeSection} />

      {/* Main Content Assembly */}
      <main className="w-full">
        {/* Section 1 */}
        <Hero />
        
        {/* Section 2 */}
        <PlacementTest />
        
        {/* Section 3 */}
        <SuitableClass />
        
        {/* Section 4 */}
        <Roadmap />
        
        {/* Section 5 */}
        <Programs />
        
        {/* Section 6 */}
        <Results />
        
        {/* Section 7 */}
        <Tutors />
        
        {/* Section 8 */}
        <ClassDemo />
        
        {/* Section 9 */}
        <Testimonials />
        
        {/* Section 10 */}
        <Calculator />
        
        {/* Section 11 */}
        <Advantages />
        
        {/* Section 12 */}
        <FAQ />
        
        {/* Section 13 */}
        <RegistrationForm />
      </main>

      {/* Footer */}
      <Footer onNavClick={handleScrollToSection} />

      {/* Conversion Features */}
      <FloatingWhatsApp />
      <StickyMobileCTA />
      <ExitIntentPopup />

    </div>
  );
}

