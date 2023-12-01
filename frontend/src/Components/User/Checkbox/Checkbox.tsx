interface checkboxProps {
  onChange: () => void;
  value: boolean;
  label: string;
}

const Checkbox: React.FC<checkboxProps> = ({ label, value, onChange }) =>  {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />{" "}
      {label}
    </label>
  )
}

export default Checkbox