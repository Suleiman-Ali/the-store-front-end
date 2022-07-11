import { ProductType } from '../data';

interface ProductColorsProps {
  product: ProductType;
  selectedColor: string;
  onClick: (color: string) => void;
}

function ProductColors({
  product,
  selectedColor,
  onClick,
}: ProductColorsProps): JSX.Element {
  return (
    <div className="productPage__colors">
      {product.colors.map((color) => (
        <div
          key={color}
          className="productPage__color"
          style={{ backgroundColor: color }}
          onClick={() => onClick(color)}
        >
          {color === selectedColor && (
            <i className={`bi bi-check productPage__colorIcon`}></i>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductColors;
