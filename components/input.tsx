export const Input = ({
  label,
  type,
  id,
  placeholder,
  value,
  handleChange,
  required,
}: {
  label: string;
  type: "text" | "number";
  id: string;
  placeholder: string;
  value: string | number | readonly string[];
  handleChange: (e: any) => void;
  required?: boolean;
}) => {
  return (
    <section className="input">
      <label className="admin_add-vehicle_form-label">{label}</label>
      <input
        className="admin_add-vehicle_form-input"
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </section>
  );
};
