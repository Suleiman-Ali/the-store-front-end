import React, { FormEvent, FormEventHandler } from 'react';

interface InputChangeProps {
  text: string;
  placeHolder: string;
  type?: string;
  maxLength?: number;
  max?: number;
  min?: number;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  value: any;
}

function InputChange({
  text,
  placeHolder,
  type,
  max,
  maxLength,
  min,
  onChange,
  value,
}: InputChangeProps): JSX.Element {
  return (
    <div className="add__formBox">
      <label htmlFor={text} className="add__label">
        {text}
      </label>
      <input
        type={type || 'text'}
        name={text}
        id={text}
        className="add__input"
        placeholder={placeHolder}
        maxLength={maxLength || 50}
        required
        min={min}
        max={max}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default InputChange;
