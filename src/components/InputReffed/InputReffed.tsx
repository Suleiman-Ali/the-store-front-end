import React from 'react';

interface InputReffedTypes {
  styles: any;
  text: string;
  placeHolder: string;
  type?: string;
  maxLength?: number;
  max?: number;
  min?: number;
}

const InputReffed = React.forwardRef<HTMLInputElement, InputReffedTypes>(
  (props, ref) => {
    return (
      <div className={props.styles.add__formBox}>
        <label htmlFor={props.text} className={props.styles.add__label}>
          {props.text}
        </label>
        <input
          type={props.type || 'text'}
          name={props.text}
          id={props.text}
          className={props.styles.add__input}
          placeholder={props.placeHolder}
          maxLength={props.maxLength || 50}
          required
          ref={ref}
          min={props.min}
          max={props.max}
        />
      </div>
    );
  }
);

export default InputReffed;
