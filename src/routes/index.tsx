import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Resume from '../pages/Resume';
import Skills from '../pages/Skills';
import Projects from '../pages/Projects';
import Experience from '../pages/Experience';
import Blog from '../pages/Blog';
import Academy from '../pages/Academy';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/resume" element={<Resume />} />
    <Route path="/skills" element={<Skills />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/academy" element={<Academy />} />
  </Routes>
);

export default AppRoutes;
