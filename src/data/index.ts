import jwtDecode from 'jwt-decode';

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  colors: string[];
  sizes: string[];
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
  return null;
}
