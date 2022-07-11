import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  BrandType,
  CartType,
  CategoryType,
  EmailType,
  getConfig,
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
  ordersOfUserSetter: (orders: RealOrderType[]) => void;
  addToCart: (order: OrderType) => void;
  clearCart: () => void;
  checkout: (orders: RealOrderType[]) => void;
  logout: () => void;
  addCategory: (name: string) => void;
  addBrand: (name: string) => void;
  addProduct: (product: ProductType) => void;
  editProduct: (product: ProductType) => void;
  allOrdersSetter: (orders: RealOrderType[]) => void;
  brandsSetter: (brands: BrandType[]) => void;
  categoriesSetter: (cats: CategoryType[]) => void;
  productsSetter: (products: ProductType[]) => void;
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
  const ordersOfUserSetter = (orders: RealOrderType[]) => setOrders(orders);
  const allOrdersSetter = (orders: RealOrderType[]) => setAllOrders(orders);
  const brandsSetter = (brands: BrandType[]) => setBrands(brands);
  const categoriesSetter = (cats: CategoryType[]) => setCategories(cats);
  const productsSetter = (products: ProductType[]) => setProducts(products);

  const logout = () => {
    localStorage.removeItem('JWT_TOKEN');
    setUser(undefined);
  };

  const addToCart = async (order: OrderType) => {
    if (!cart) return;

    const oldCart = { ...cart };
    const newCart = { ...cart, products: [...cart.products, order] };
    setCart(newCart);

    const config = getConfig();

    try {
      const { data } = await api.put('/carts', newCart, config);
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

    try {
      const config = getConfig();
      await api.put('/carts', newCart, config);
    } catch (e) {
      setCart(oldCart);
    }
  };

  const checkout = async (ordersInput: RealOrderType[]) => {
    if (!user || !cart) return;
    const config = getConfig();

    const oldCart = { ...cart };
    const newCart = {
      ...cart,
      products: [],
    };
    setCart(newCart);
    try {
      await api.put('/carts', newCart, config);
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

  const addCategory = async (name: string) => {
    const config = getConfig();
    const { data: newCategory } = await api.post(
      '/categories',
      { name },
      config
    );
    setCategories((categories) => [...categories, newCategory]);
  };

  const addBrand = async (name: string) => {
    const config = getConfig();
    const { data: newBrand } = await api.post('/brands', { name }, config);
    setBrands((brands) => [...brands, newBrand]);
  };

  const addProduct = async (product: ProductType) => {
    const config = getConfig();
    const { data: newProduct } = await api.post('/products', product, config);
    setProducts((products) => [...products, newProduct]);
  };

  const editProduct = async (product: ProductType) => {
    const config = getConfig();
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

  useEffect(() => {
    const resizeHandler = () => setIsWindowOver900(window.innerWidth >= 999);
    window.addEventListener<'resize'>('resize', resizeHandler);
    return () => window.removeEventListener<'resize'>('resize', resizeHandler);
  }, []);

  useEffect(() => {
    setUser(getUser());
    const func = async () => {
      try {
        const { data: products } = await api.get('/products');
        setProducts(products);
      } catch (e) {
        func();
      }
    };
    func();
  }, []);

  useEffect(() => {
    setUser(getUser());
    const func = async () => {
      try {
        const { data: categories } = await api.get('/categories');
        setCategories(categories);
      } catch (e) {
        func();
      }
    };
    func();
  }, []);

  useEffect(() => {
    setUser(getUser());
    const func = async () => {
      try {
        const { data: brands } = await api.get('/brands');
        setBrands(brands);
      } catch (e) {
        func();
      }
    };
    func();
  }, []);

  useEffect(() => {
    if (!user || (user && user.isAdmin)) return;
    const func = async () => {
      try {
        const config = getConfig();
        const { data: cart } = await api.get(`/carts/${user._id}`, config);
        setCart(cart);
      } catch (e) {
        func();
      }
    };
    func();
  }, [user]);

  useEffect(() => {
    if (!user || (user && user.isAdmin)) return;
    const func = async () => {
      try {
        const config = getConfig();
        const { data: orders } = await api.get(`/orders/${user._id}`, config);
        setOrders(orders);
      } catch (e) {
        func();
      }
    };
    func();
  }, [user]);

  useEffect(() => {
    if (!user || !user.isAdmin) return;
    const func = async () => {
      try {
        const config = getConfig();
        const { data: orders } = await api.get('/orders', config);
        setAllOrders(orders);
      } catch (e) {
        func();
      }
    };
    func();
  }, [user]);

  useEffect(() => {
    if (!user || !user.isAdmin) return;
    const func = async () => {
      try {
        const config = getConfig();
        const { data: emails } = await api.get('/emails', config);
        setAllEmails(emails);
      } catch (e) {
        func();
      }
    };
    func();
  }, [user]);

  return (
    <Context.Provider
      value={{
        products,
        categories,
        brands,
        user,
        cart,
        isWindowOver1000,
        addToCart,
        clearCart,
        checkout,
        orders,
        logout,
        addCategory,
        addBrand,
        addProduct,
        editProduct,
        allEmails,
        allOrders,
        userSetter,
        cartSetter,
        ordersOfUserSetter,
        allOrdersSetter,
        brandsSetter,
        categoriesSetter,
        productsSetter,
      }}
    >
      {children}
    </Context.Provider>
  );
}
