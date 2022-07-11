import { useContext } from 'react';
import Context from '../context';
import { BrandType, CategoryType } from '../data';

interface EditItemProps {
  compare: string | number;
  onClick: () => void;
  item: BrandType | CategoryType;
  isDelete?: boolean;
  onDelete?: () => void;
  canDelete?: boolean;
}

function EditItem({
  item,
  compare,
  onClick,
  isDelete,
  onDelete,
  canDelete,
}: EditItemProps): JSX.Element {
  const { user } = useContext(Context);

  return (
    <>
      <p
        className={`products__editItem ${
          compare === item._id ? 'products__selected' : ''
        }`}
        onClick={onClick}
        key={item._id}
      >
        {item.name}
      </p>

      {isDelete && user && user.isAdmin === true && (
        <button
          className={`bi bi-x-circle-fill products__editItemIcon`}
          title="Delete"
          onClick={onDelete}
          disabled={!canDelete}
          style={{ opacity: canDelete ? 1 : 0.75 }}
        />
      )}
    </>
  );
}

export default EditItem;
