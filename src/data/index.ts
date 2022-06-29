import jwtDecode from 'jwt-decode';
import Product from '../components/pages/Product/Product';

export type EmailType = {
  date?: string;
  user_id: string;
  user_email: string;
  title: string;
  message: string;
};

export type RealOrderType = {
  date?: string;
  _id?: string;
  name: string;
  user_id: string;
  product_id: string;
  color: string;
  size: string;
  price: number;
  shipping_address: string;
};

export type OrderType = {
  _id?: string;
  product_id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  picture: string;
};

export type CartType = {
  user_id: string;
  products: OrderType[];
};

export type CategoryType = {
  _id: string;
  name: string;
};

export type BrandType = {
  _id: string;
  name: string;
};

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  available: boolean;
  sizes: string[];
  colors: string[];
  brand_id: string;
  category_id: string;
  description: string;
  pictures: string[];
};

export type UserType = {
  _id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
};

export function getUser() {
  const token = localStorage.getItem('JWT_TOKEN');
  if (token) return jwtDecode<UserType>(token);
  return undefined;
}

export function getUserTo(user: UserType | undefined) {
  if (user && user.isAdmin)
    return { to: `/admin/${user._id}`, icon: 'bi-person-fill' };
  if (user && !user.isAdmin)
    return { to: `/user/${user._id}`, icon: 'bi-person-fill' };
  return { to: '/login', icon: 'bi-person-plus-fill' };
}

export function getOfKeyword(products: ProductType[], keyword: string) {
  if (products.length === 0) return products;
  return products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
}

export const getOfCategory = (products: ProductType[], category_id: string) => {
  if (category_id === 'All') return products;
  return products.filter((product) => product.category_id === category_id);
};

export const getOfBrand = (products: ProductType[], brand_id: string) => {
  if (brand_id === 'All') return products;
  return products.filter((product) => product.brand_id === brand_id);
};

export const getOfRange = (products: ProductType[], range: number) => {
  return products.filter((product) => product.price >= range);
};

export const sort = (products: ProductType[], method: string) => {
  if (method === 'Price/Lowest')
    return products.sort((a, b) => {
      if (a.price > b.price) return 1;
      if (b.price > a.price) return -1;
      return 0;
    });

  if (method === 'Price/Highest')
    return products.sort((a, b) => {
      if (a.price > b.price) return -1;
      if (b.price > a.price) return 1;
      return 0;
    });

  if (method === 'Name/A-Z')
    return products.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    });

  if (method === 'Name/Z-A')
    return products.sort((a, b) => {
      if (a.name > b.name) return -1;
      if (b.name > a.name) return 1;
      return 0;
    });
  return products;
};
