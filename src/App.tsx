import { useState } from 'react';
import { ThemeProvider } from './lib/theme';
import { AuthProvider } from './lib/auth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Why from './components/Why';
import Batches from './components/Batches';
import Mentors from './components/Mentors';
import Results from './components/Results';
import Process from './components/Process';
import StudyMaterials from './components/StudyMaterials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ApplyModal from './components/ApplyModal';
import BookDemoModal from './components/BookDemoModal';
import StudentPortal from './components/StudentPortal';

function App() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="grain min-h-screen bg-theme-bg text-theme-text selection:bg-theme-primary selection:text-theme-bg">
          <Navbar
            onApply={() => setApplyOpen(true)}
            onBookDemo={() => setBookDemoOpen(true)}
            onPortal={() => setPortalOpen(true)}
          />
          <main>
            <Hero
              onApply={() => setApplyOpen(true)}
              onBookDemo={() => setBookDemoOpen(true)}
            />
            <Pillars />
            <Why />
            <Batches onApply={() => setApplyOpen(true)} />
            <Mentors />
            <Results />
            <Process onApply={() => setApplyOpen(true)} />
            <StudyMaterials />
            <Contact />
          </main>
          <Footer />
          <FloatingActions onBookDemo={() => setBookDemoOpen(true)} />
          <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
          <BookDemoModal open={bookDemoOpen} onClose={() => setBookDemoOpen(false)} />
          <StudentPortal open={portalOpen} onClose={() => setPortalOpen(false)} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
