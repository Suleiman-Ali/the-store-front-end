import { forwardRef } from 'react';

interface InputReffedTypes {
  text: string;
  placeHolder: string;
  type?: string;
  maxLength?: number;
  max?: number;
  min?: number;
}

const InputReffed = forwardRef<HTMLInputElement, InputReffedTypes>(
  (props, ref) => {
    return (
      <div className="add__formBox">
        <label htmlFor={props.text} className="add__label">
          {props.text}
        </label>
        <input
          type={props.type || 'text'}
          name={props.text}
          id={props.text}
          className="add__input"
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
