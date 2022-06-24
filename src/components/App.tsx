import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContextProvider } from '../context';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="app">
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
