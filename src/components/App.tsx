import Context from '../context';
import AboutPage from './pages/AboutPage';
import AddBrandPage from './pages/AddBrandPage';
import AddCategoryPage from './pages/AddCategoryPage';
import AddProductPage from './pages/AddProductPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import ContactUsPage from './pages/ContactUsPage';
import EditProductPage from './pages/EditProductPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotfoundPage from './pages/NotfoundPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';
import SignUpPage from './pages/SignUpPage';
import UserPage from './pages/UserPage';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { user } = useContext(Context);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />

          {!user && <Route path="/login" element={<LoginPage />} />}
          {!user && <Route path="/sign-up" element={<SignUpPage />} />}

          {user && !user.isAdmin && (
            <Route path="/user/:id" element={<UserPage />} />
          )}
          {user && !user.isAdmin && (
            <Route path="/contact" element={<ContactUsPage />} />
          )}
          {user && !user.isAdmin && (
            <Route path="/cart" element={<CartPage />} />
          )}

          {user && user.isAdmin && (
            <Route path="admin/:id" element={<AdminPage />} />
          )}
          {user && user.isAdmin && (
            <Route path="/add-category" element={<AddCategoryPage />} />
          )}
          {user && user.isAdmin && (
            <Route path="/add-brand" element={<AddBrandPage />} />
          )}
          {user && user.isAdmin && (
            <Route path="/add-product" element={<AddProductPage />} />
          )}
          {user && user.isAdmin && (
            <Route path="/edit-product" element={<EditProductPage />} />
          )}

          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
