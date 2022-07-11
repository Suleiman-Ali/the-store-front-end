interface AddButtonProps {
  buttonCls: string;
  iconCls: string;
}

function AddButton({ buttonCls, iconCls }: AddButtonProps): JSX.Element {
  return (
    <button type="submit" className={buttonCls}>
      Add
      <i className={`bi bi-plus-circle-fill ${iconCls}`} />
    </button>
  );
}

export default AddButton;
