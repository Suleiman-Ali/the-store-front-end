interface SuccessMessageProps {
  message: string;
  onClick: () => void;
}

function SuccessMessage({
  message,
  onClick,
}: SuccessMessageProps): JSX.Element {
  return (
    <div className="successMessage">
      <p className="successMessage__message">{message}</p>
      <i className="bi bi-x successMessage__icon" onClick={onClick} />
    </div>
  );
}

export default SuccessMessage;
