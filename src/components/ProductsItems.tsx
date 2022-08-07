import api from '../api';
import Context from '../context';
import { useContext, useState } from 'react';
import { getConfig, ProductType } from '../data';

import ProductItem from './ProductItem';

interface ProductsItemsProps {
  products: ProductType[];
}

function ProductsItems({ products }: ProductsItemsProps): JSX.Element {
  const { user, productsSetter } = useContext(Context);
  const [canDelete, setCanDelete] = useState<boolean>(true);

  const deleteProduct = async (id: string) => {
    setCanDelete(false);
    const config = getConfig();

    const oldProducts = [...products];
    const newProducts = products.filter((product) => product._id !== id);
    productsSetter(newProducts);

    try {
      await api.delete(`/products/${id}`, config);
    } catch (e) {
      productsSetter(oldProducts);
    }
    setCanDelete(true);
  };

  return (
    <div className="products__products">
      {products.map((product) => (
        <ProductItem
          product={product}
          canDelete={canDelete}
          onClick={() => deleteProduct(product._id)}
          key={product._id}
        />
      ))}
    </div>
  );
}

export default ProductsItems;
