import React from 'react';
import { CategoryType, BrandType } from '../data';

interface SelectedReffedProps {
  text: string;
  items: CategoryType[] | BrandType[];
}

const SelectReffed = React.forwardRef<HTMLSelectElement, SelectedReffedProps>(
  (props, ref) => {
    return (
      <div className="add__formBox">
        <label className="add__label" htmlFor={props.text}>
          {props.text}
        </label>
        <select id={props.text} className="add__select" required ref={ref}>
          {props.items.map((item) => (
            <option value={item._id} className="add__option" key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SelectReffed;
