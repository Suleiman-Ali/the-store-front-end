import React from 'react';
import { BrandType, CategoryType } from '../../data';

interface SelectedReffedProps {
  styles: any;
  text: string;
  items: CategoryType[] | BrandType[];
}

const SelectReffed = React.forwardRef<HTMLSelectElement, SelectedReffedProps>(
  (props, ref) => {
    return (
      <div className={props.styles.add__formBox}>
        <label className={props.styles.add__label} htmlFor={props.text}>
          {props.text}
        </label>
        <select
          id={props.text}
          className={props.styles.add__select}
          required
          ref={ref}
        >
          {props.items.map((item) => (
            <option
              value={item._id}
              className={props.styles.add__option}
              key={item._id}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SelectReffed;
