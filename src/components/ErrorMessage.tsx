interface ErrorMessageProps {
  message: string;
  onClick: () => void;
}

function ErrorMessage({ message, onClick }: ErrorMessageProps): JSX.Element {
  return (
    <div className="errorMessage">
      <p className="errorMessage__message">{message}</p>
      <i className="bi bi-x errorMessage__icon" onClick={onClick} />
    </div>
  );
}

export default ErrorMessage;
