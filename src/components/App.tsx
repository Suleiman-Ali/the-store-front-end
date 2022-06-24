import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContextProvider } from '../context';
import About from './pages/About/About';
import ContactUs from './pages/ContactUs/ContactUs';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Product from './pages/Product/Product';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <div className="app">
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
