import { createContext, ReactNode, useEffect, useState } from 'react';
import { getUser, ProductType, UserType } from '../data';
import api from '../api';

interface ContextValuesTypes {
  products: ProductType[];
  user: UserType | null;
  userSetter: (user: UserType) => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextValuesTypes>(undefined!);
export default Context;

export function ContextProvider({
  children,
}: ContextProviderProps): JSX.Element {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [user, setUser] = useState<UserType | null>(getUser());

  const userSetter = (user: UserType) => setUser(user);

  useEffect(() => {
    (async () => {
      const { data: products } = await api.get('/products');
      setProducts(products);
    })();
  }, []);

  return (
    <Context.Provider value={{ products, user, userSetter }}>
      {children}
    </Context.Provider>
  );
}
