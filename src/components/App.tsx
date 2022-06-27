import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContextProvider } from '../context';
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
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="admin/:id" element={<Admin />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/add-brand" element={<AddBrand />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product" element={<EditProduct />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
