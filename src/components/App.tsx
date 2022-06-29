import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Context from '../context';
import About from './pages/About/About';
import AddBrand from './pages/AddBrand/AddBrand';
import AddCategory from './pages/AddCategory/AddCategory';
import AddProduct from './pages/AddProduct/AddProduct';
import Admin from './pages/Admin/Admin';
import Cart from './pages/Cart/Cart';
import ContactUs from './pages/ContactUs/ContactUs';
import EditProduct from './pages/EditProduct/EditProduct';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Notfound from './pages/Notfound/Notfound';
import Product from './pages/Product/Product';
import Products from './pages/Products/Products';
import SignUp from './pages/SignUp/SignUp';
import User from './pages/User/User';

function App() {
  const { user } = useContext(Context);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />

          {!user && <Route path="/login" element={<Login />} />}
          {!user && <Route path="/sign-up" element={<SignUp />} />}

          {user && !user.isAdmin && (
            <Route path="/user/:id" element={<User />} />
          )}
          {user && !user.isAdmin && (
            <Route path="/contact" element={<ContactUs />} />
          )}
          {user && !user.isAdmin && <Route path="/cart" element={<Cart />} />}

          {user && user.isAdmin && (
            <Route path="admin/:id" element={<Admin />} />
          )}
          {user && user.isAdmin && (
            <Route path="/add-category" element={<AddCategory />} />
          )}
          {user && user.isAdmin && (
            <Route path="/add-brand" element={<AddBrand />} />
          )}
          {user && user.isAdmin && (
            <Route path="/add-product" element={<AddProduct />} />
          )}
          {user && user.isAdmin && (
            <Route path="/edit-product" element={<EditProduct />} />
          )}

          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
