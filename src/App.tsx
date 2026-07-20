import { useState } from 'react';
import { ThemeProvider } from './lib/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Why from './components/Why';
import Batches from './components/Batches';
import Mentors from './components/Mentors';
import Results from './components/Results';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ApplyModal from './components/ApplyModal';
import BookDemoModal from './components/BookDemoModal';

function App() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="grain min-h-screen bg-theme-bg text-theme-text selection:bg-theme-primary selection:text-theme-bg">
        <Navbar
          onApply={() => setApplyOpen(true)}
          onBookDemo={() => setBookDemoOpen(true)}
        />
        <main>
          <Hero onApply={() => setApplyOpen(true)} onBookDemo={() => setBookDemoOpen(true)} />
          <Pillars />
          <Why />
          <Batches onApply={() => setApplyOpen(true)} />
          <Mentors />
          <Results />
          <Process onApply={() => setApplyOpen(true)} />
          <Contact />
        </main>
        <Footer />
        <FloatingActions onBookDemo={() => setBookDemoOpen(true)} />
        <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
        <BookDemoModal open={bookDemoOpen} onClose={() => setBookDemoOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
