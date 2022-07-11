import React from 'react';

interface TextareaReffedProps {
  text: string;
  placeholder: string;
  maxLength?: number;
}

const TextareaReffed = React.forwardRef<
  HTMLTextAreaElement,
  TextareaReffedProps
>((props, ref) => {
  return (
    <div className="add__formBox">
      <label className="add__label" htmlFor={props.text}>
        {props.text}
      </label>
      <textarea
        id={props.text}
        className="add__textarea"
        placeholder={props.placeholder}
        maxLength={props.maxLength || 50}
        required
        ref={ref}
      />
    </div>
  );
});

export default TextareaReffed;
