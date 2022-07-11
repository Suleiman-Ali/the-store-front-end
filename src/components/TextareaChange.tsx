import { FormEvent } from 'react';

interface TextareaChangeProps {
  text: string;
  placeHold: string;
  maxLength: number;
  value: string;
  onChange: (e: FormEvent<HTMLTextAreaElement>) => void;
}

function TextareaChange({
  placeHold,
  text,
  maxLength,
  onChange,
  value,
}: TextareaChangeProps): JSX.Element {
  return (
    <div className="add__formBox">
      <label className="add__label" htmlFor={text}>
        {text}
      </label>
      <textarea
        id={text}
        className="add__textarea"
        placeholder={placeHold}
        maxLength={maxLength}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextareaChange;
