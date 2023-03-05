export const Radio = ({ label, handleChange, required, name }) => {
  return (
    <section className="radio">
      <label className="admin_add-vehicle_form-label">{label}</label>
      <article className="admin_add-vehicle_form_checkboxes">
        <article className="admin_add-vehicle_form_checkbox--yes">
          <input
            type="radio"
            name={name}
            value="yes"
            id={`${name}Yes`}
            onChange={handleChange}
            required={required}
          />
          <label htmlFor={`${name}Yes`}>YES</label>
        </article>
        <article className="admin_add-vehicle_form_checkbox--no">
          <input
            type="radio"
            name={name}
            value="no"
            id={`${name}No`}
            onChange={handleChange}
            required={required}
          />
          <label htmlFor={`${name}No`}>NO</label>
        </article>
      </article>
    </section>
  );
};
