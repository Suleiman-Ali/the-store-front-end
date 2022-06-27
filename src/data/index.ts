import jwtDecode from 'jwt-decode';

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
