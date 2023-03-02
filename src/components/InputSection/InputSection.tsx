import { InputSectionProps } from "../../interface";

export default function InputSection(props: InputSectionProps) {
  const {
    name,
    title,
    handleChange,
    formData,
    handleBlur,
    handleFocus,
    errors,
  } = props;
  return (
    <section className="inputSection">
      <label className="subtitle">{title}:</label>
      <input
        onChange={handleChange}
        value={formData[name]}
        onBlur={handleBlur}
        onFocus={handleFocus}
        type="text"
        className={errors[name] ? "input error" : "input"}
        placeholder={`Enter ${title}`}
        name={name}
      />
      {errors[name] && <div className="errorMessage">This field is empty</div>}
    </section>
  );
}
