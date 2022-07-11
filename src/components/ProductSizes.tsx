import { ProductType } from '../data';

interface ProductSizesProps {
  product: ProductType;
  selectedSize: string;
  onClick: (size: string) => void;
}

function ProductSizes({
  product,
  selectedSize,
  onClick,
}: ProductSizesProps): JSX.Element {
  return (
    <div className="productPage__sizes">
      {product.sizes.map((size) => (
        <p
          className={`productPage__size ${
            size === selectedSize && 'productPage__sizeSelected'
          }`}
          onClick={() => onClick(size)}
          key={size}
        >
          {size}
        </p>
      ))}
    </div>
  );
}

export default ProductSizes;
