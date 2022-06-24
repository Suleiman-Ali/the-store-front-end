import { createContext, ReactNode, useEffect, useState } from 'react';
import { ProductType } from '../data';
import api from '../api';

interface ContextValuesTypes {
  products: ProductType[];
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

  useEffect(() => {
    (async () => {
      const { data: products } = await api.get('/products');
      setProducts(products);
    })();
  }, []);

  return <Context.Provider value={{ products }}>{children}</Context.Provider>;
}
