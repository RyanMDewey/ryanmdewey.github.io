import React from 'react';
import RouterConfig from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main>
        <RouterConfig />
      </main>
      <Footer />
    </div>
  );
}
