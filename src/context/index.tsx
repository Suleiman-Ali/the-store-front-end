import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  BrandType,
  CartType,
  CategoryType,
  EmailType,
  getUser,
  OrderType,
  ProductType,
  RealOrderType,
  UserType,
} from '../data';
import api from '../api';
import jwtDecode from 'jwt-decode';

interface ContextValuesTypes {
  products: ProductType[];
  categories: CategoryType[];
  orders: RealOrderType[];
  brands: BrandType[];
  user: UserType | undefined;
  cart: CartType | undefined;
  isWindowOver1000: boolean;
  signUp: (name: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  addToCart: (order: OrderType) => void;
  deleteFromCart: (id: string) => void;
  clearCart: () => void;
  checkout: (orders: RealOrderType[]) => void;
  logout: () => void;
  cancelOrder: (id: string) => void;
  deleteCategory: (id: string) => void;
  deleteBrand: (id: string) => void;
  addCategory: (name: string) => void;
  addBrand: (name: string) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: ProductType) => void;
  editProduct: (product: ProductType) => void;
  resolveOrder: (id: string) => void;
  allOrders: RealOrderType[];
  allEmails: EmailType[];
}

interface ContextProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextValuesTypes>(undefined!);
export default Context;

export function ContextProvider({
  children,
}: ContextProviderProps): JSX.Element {
  const [isWindowOver1000, setIsWindowOver900] = useState<boolean>(
    window.innerWidth >= 999
  );
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [orders, setOrders] = useState<RealOrderType[]>([]);
  const [allOrders, setAllOrders] = useState<RealOrderType[]>([]);
  const [allEmails, setAllEmails] = useState<EmailType[]>([]);
  const [user, setUser] = useState<UserType | undefined>();
  const [cart, setCart] = useState<CartType | undefined>();

  const signUp = async (name: string, email: string, password: string) => {
    const { data: userObj } = await api.post('/users', {
      name,
      email,
      password,
    });

    const { data: token } = await api.post('/auth', {
      email,
      password,
    });

    const config = {
      headers: { 'x-auth-token': token as string },
    };

    await api.post('/carts', {}, config);

    setUser(userObj);
    localStorage.setItem('JWT_TOKEN', token);
  };

  const login = async (email: string, password: string) => {
    const { data: token } = await api.post('/auth', {
      email,
      password,
    });

    setUser(jwtDecode(token));
    localStorage.setItem('JWT_TOKEN', token);
  };

  const logout = () => {
    localStorage.removeItem('JWT_TOKEN');
    setUser(undefined);
  };

  const addToCart = async (order: OrderType) => {
    if (!cart) return;

    const oldCart = { ...cart };
    const newCart = { ...cart, products: [...cart.products, order] };
    setCart(newCart);

    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    try {
      const { data } = await api.put('/carts/', newCart, config);
      setCart(data);
    } catch (e) {
      setCart(oldCart);
    }
  };

  const deleteFromCart = async (id: string) => {
    if (!cart) return;

    const oldCart = { ...cart };
    const newCart = {
      ...cart,
      products: [...cart.products.filter((order) => order._id !== id)],
    };
    setCart(newCart);

    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    try {
      const { data } = await api.put('/carts/', newCart, config);
      setCart(data);
    } catch (e) {
      setCart(oldCart);
    }
  };

  const clearCart = async () => {
    if (!cart) return;

    const oldCart = { ...cart };
    const newCart = {
      ...cart,
      products: [],
    };
    setCart(newCart);

    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    try {
      const { data } = await api.put('/carts', newCart, config);
      setCart(data);
    } catch (e) {
      setCart(oldCart);
    }
  };

  const checkout = async (ordersInput: RealOrderType[]) => {
    if (!user || !cart) return;

    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    const oldCart = { ...cart };
    const newCart = {
      ...cart,
      products: [],
    };
    setCart(newCart);
    try {
      const { data } = await api.put('/carts', newCart, config);
      setCart(data);
    } catch (e) {
      setCart(oldCart);
    }

    const oldOrders = [...orders];
    const newOrders = [...orders, ...ordersInput];
    setOrders(newOrders);

    try {
      for (let order of ordersInput) await api.post('/orders', order, config);
      const { data } = await api.get(`/orders/${user._id}`, config);
      setOrders(data);
    } catch (e) {
      setOrders(oldOrders);
    }
  };

  const cancelOrder = async (id: string) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    const oldOrders = [...orders];
    const newOrders = orders.filter((order) => order._id !== id);
    setOrders(newOrders);

    try {
      await api.delete(`/orders/${id}`, config);
    } catch (e) {
      setOrders(oldOrders);
    }
  };

  const deleteCategory = async (id: string) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    const oldCategories = [...categories];
    const newCategories = categories.filter((cat) => cat._id !== id);
    setCategories(newCategories);

    try {
      await api.delete(`/categories/${id}`, config);
    } catch (e) {
      setCategories(oldCategories);
    }
  };

  const deleteBrand = async (id: string) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    const oldBrands = [...brands];
    const newBrands = brands.filter((brand) => brand._id !== id);
    setBrands(newBrands);

    try {
      await api.delete(`/brands/${id}`, config);
    } catch (e) {
      setBrands(oldBrands);
    }
  };

  const addCategory = async (name: string) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    const { data: newCategory } = await api.post(
      '/categories',
      { name },
      config
    );
    setCategories((categories) => [...categories, newCategory]);
  };

  const addBrand = async (name: string) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    const { data: newBrand } = await api.post('/brands', { name }, config);
    setBrands((brands) => [...brands, newBrand]);
  };

  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    const oldProducts = [...products];
    const newProducts = products.filter((product) => product._id !== id);
    setProducts(newProducts);

    try {
      await api.delete(`/products/${id}`, config);
    } catch (e) {
      setProducts(oldProducts);
    }
  };

  const addProduct = async (product: ProductType) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    const { data: newProduct } = await api.post('/products', product, config);
    setProducts((products) => [...products, newProduct]);
  };

  const editProduct = async (product: ProductType) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    const { data: newProduct } = await api.put(
      `/products/${product._id}`,
      product,
      config
    );
    setProducts((products) => [
      ...products.filter((p) => p._id !== product._id),
      newProduct,
    ]);
  };

  const resolveOrder = async (id: string) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    const oldOrders = [...allOrders];
    const newOrders = allOrders.filter((order) => order._id !== id);
    setAllOrders(newOrders);

    try {
      await api.delete(`/orders/${id}`, config);
    } catch (e) {
      setAllOrders(oldOrders);
    }
  };

  useEffect(() => {
    const resizeHandler = () => setIsWindowOver900(window.innerWidth >= 999);
    window.addEventListener<'resize'>('resize', resizeHandler);
    return () => window.removeEventListener<'resize'>('resize', resizeHandler);
  }, []);

  useEffect(() => {
    setUser(getUser());
    (async () => {
      const { data: products } = await api.get('/products');
      const { data: categories } = await api.get('/categories');
      const { data: brands } = await api.get('/brands');
      setProducts(products);
      setCategories(categories);
      setBrands(brands);
    })();
  }, []);

  useEffect(() => {
    if (!user || (user && user.isAdmin)) return;
    (async () => {
      const token = localStorage.getItem('JWT_TOKEN');
      const config = {
        headers: { 'x-auth-token': token as string },
      };
      const { data: cart } = await api.get(`/carts/${user._id}`, config);
      const { data: orders } = await api.get(`/orders/${user._id}`, config);
      setCart(cart);
      setOrders(orders);
    })();
  }, [user]);

  useEffect(() => {
    if (!user || !user.isAdmin) return;
    (async () => {
      const token = localStorage.getItem('JWT_TOKEN');
      const config = {
        headers: { 'x-auth-token': token as string },
      };
      const { data: orders } = await api.get('/orders', config);
      const { data: emails } = await api.get('/emails', config);
      setAllOrders(orders);
      setAllEmails(emails);
    })();
  }, [user]);

  return (
    <Context.Provider
      value={{
        products,
        categories,
        brands,
        user,
        cart,
        signUp,
        isWindowOver1000,
        addToCart,
        deleteFromCart,
        clearCart,
        checkout,
        orders,
        logout,
        cancelOrder,
        deleteCategory,
        deleteBrand,
        addCategory,
        addBrand,
        deleteProduct,
        addProduct,
        editProduct,
        allEmails,
        allOrders,
        resolveOrder,
        login,
      }}
    >
      {children}
    </Context.Provider>
  );
}
