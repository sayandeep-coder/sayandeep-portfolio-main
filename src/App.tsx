import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageProgress } from './components/layout/PageProgress';
import { HomePage } from './pages/HomePage';
import { CaseStudyRoute } from './pages/CaseStudyRoute';
import { NotFoundPage } from './pages/NotFoundPage';
import { useTheme } from './hooks/useTheme';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <PageProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-studies/:id" element={<CaseStudyRoute />} />
        <Route path="/work/:id" element={<CaseStudyRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
