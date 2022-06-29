import React from 'react';

interface TextareaReffedProps {
  styles: any;
  text: string;
  placeholder: string;
  maxLength?: number;
}

const TextareaReffed = React.forwardRef<
  HTMLTextAreaElement,
  TextareaReffedProps
>((props, ref) => {
  return (
    <div className={props.styles.add__formBox}>
      <label className={props.styles.add__label} htmlFor={props.text}>
        {props.text}
      </label>
      <textarea
        id={props.text}
        className={props.styles.add__textarea}
        placeholder={props.placeholder}
        maxLength={props.maxLength || 50}
        required
        ref={ref}
      />
    </div>
  );
});

export default TextareaReffed;
