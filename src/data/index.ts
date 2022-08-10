import jwtDecode from 'jwt-decode';

export const brands = [
  { _id: '62c25d30b8516999df108482', name: 'IKEA' },
  { _id: '62c25d58b8516999df108484', name: 'Apple' },
  { _id: '62c25d66b8516999df108486', name: 'Wally' },
];

export const categories = [
  { _id: '62c25ce6b8516999df10847c', name: 'Furniture' },
  { _id: '62c25d0cb8516999df10847e', name: 'Devices' },
  { _id: '62c25d16b8516999df108480', name: 'Books' },
];

export const products = [
  {
    _id: '62c25e19b8516999df10848a',
    date: '2022-07-04T02:16:24.128+00:00',
    name: 'Floor Lamp',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
      `,
    price: 125,
    available: true,
    colors: ['red', 'green', 'blue'],
    sizes: ['Small', 'Medium', 'Big'],
    pictures: [
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80',
      ' https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ],
    brand_id: '62c25d30b8516999df108482',
    category_id: '62c25ce6b8516999df10847c',
  },
  {
    _id: '62c25ff3b8516999df108498',
    date: '2022-07-04T02:16:24.128+00:00',
    name: 'MacBook',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
    `,
    price: 950,
    available: true,
    colors: ['silver', 'black'],
    sizes: ['Small', 'Big'],
    pictures: [
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1615750173609-2fbf12fd1d2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ],
    brand_id: '62c25d58b8516999df108484',
    category_id: '62c25d0cb8516999df10847e',
  },
  {
    _id: '62c26255b8516999df1084ac',
    date: '2022-07-04T02:16:24.128+00:00',
    name: 'Atomic Habits',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
    `,
    price: 15,
    available: true,
    colors: ['silver', 'black'],
    sizes: ['Medium'],
    pictures: [
      'https://images.unsplash.com/photo-1613520761471-8d5f28e343c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1614813231574-843cb1fb940b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    ],
    brand_id: '62c25d66b8516999df108486',
    category_id: '62c25d16b8516999df108480',
  },
];

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

export function getConfig() {
  const token = localStorage.getItem('JWT_TOKEN');
  if (!token) return;
  const config = {
    headers: { 'x-auth-token': token as string },
  };
  return config;
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
