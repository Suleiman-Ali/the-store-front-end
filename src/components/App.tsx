import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContextProvider } from '../context';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';

function App() {
  return (
    <div className="app">
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
