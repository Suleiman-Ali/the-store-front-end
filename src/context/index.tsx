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

interface ContextValuesTypes {
  products: ProductType[];
  categories: CategoryType[];
  orders: RealOrderType[];
  brands: BrandType[];
  user: UserType | undefined;
  cart: CartType | undefined;
  isWindowOver1000: boolean;
  userSetter: (user: UserType) => void;
  cartSetter: (cart: CartType) => void;
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

  const userSetter = (user: UserType) => setUser(user);
  const cartSetter = (cart: CartType) => setCart(cart);

  const addToCart = async (order: OrderType) => {
    if (!cart) return;

    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    const { data: newCart } = await api.put(
      '/carts/',
      { ...cart, products: [...cart.products, order] },
      config
    );
    setCart(newCart);
  };

  const deleteFromCart = async (id: string) => {
    if (!cart) return;

    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    const { data: newCart } = await api.put(
      '/carts/',
      {
        ...cart,
        products: [...cart.products.filter((order) => order._id !== id)],
      },
      config
    );
    setCart(newCart);
  };

  const clearCart = async () => {
    if (!cart) return;

    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    const { data: newCart } = await api.put(
      '/carts',
      {
        ...cart,
        products: [],
      },
      config
    );
    setCart(newCart);
  };

  const checkout = async (orders: RealOrderType[]) => {
    if (!user) return;

    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };

    for (let order of orders) await api.post('/orders', order, config);
    const { data: newCart } = await api.put(
      '/carts',
      {
        ...cart,
        products: [],
      },
      config
    );
    const { data: newOrders } = await api.get(`/orders/${user._id}`, config);
    setCart(newCart);
    setOrders(newOrders);
  };

  const logout = () => {
    localStorage.removeItem('JWT_TOKEN');
    setUser(undefined);
  };

  const cancelOrder = async (id: string) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    await api.delete(`/orders/${id}`, config);
    setOrders((orders) => orders.filter((order) => order._id !== id));
  };

  const deleteCategory = async (id: string) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    await api.delete(`/categories/${id}`, config);
    setCategories((categories) => categories.filter((cat) => cat._id !== id));
  };

  const deleteBrand = async (id: string) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    await api.delete(`/brands/${id}`, config);
    setBrands((brands) => brands.filter((brand) => brand._id !== id));
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
    await api.delete(`/products/${id}`, config);
    setProducts((products) => products.filter((product) => product._id !== id));
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
    await api.delete(`/orders/${id}`, config);
    setAllOrders((orders) => orders.filter((order) => order._id !== id));
  };

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
    const resizeHandler = () => setIsWindowOver900(window.innerWidth >= 999);
    window.addEventListener<'resize'>('resize', resizeHandler);
    return () => window.removeEventListener<'resize'>('resize', resizeHandler);
  }, []);

  useEffect(() => {
    if (!user) return;
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
        userSetter,
        cartSetter,
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
      }}
    >
      {children}
    </Context.Provider>
  );
}
