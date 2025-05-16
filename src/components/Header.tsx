import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="top-nav">
    <nav className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/experience">Experience</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/skills">Skills</Link>
      <Link to="/resume">Resume</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/academy">Academy</Link>
    </nav>
  </header>
);

export default Header;
