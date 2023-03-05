export const Select = ({
  label,
  handleChange,
  id,
  children,
  formError,
  defaultValue,
}) => {
  return (
    <section className="select">
      <label className="admin_add-vehicle_form-label">{label}</label>
      <select
        onChange={handleChange}
        required
        id={id}
        name={id}
        defaultValue={defaultValue}
        className={`booking_information-form-input--time ${
          formError ? "--error" : ""
        }`}
      >
        {children}
      </select>
    </section>
  );
};
