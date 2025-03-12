import { useState } from "react";
import Select from "react-select";
import '../../components/InputField/InputField.css'

const a = [
  { value: "0", label: "Testeete" },
];


export default function SearchableDropdown({ id, title, placeholder, options = a, required = true, onChange, width = 100 }) {
  const [selected, setSelected] = useState(null);

  const handleChange = (option) => {
    setSelected(option);
    if (onChange) {
      onChange(option ? option.value : "");
    }
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1.5px solid var(--grey-stroke)",
      borderRadius: "6px",
      padding: "2px",
      fontSize: "0.8rem",
      backgroundColor: "var(--background-color)",
      color: "#7a7a7a",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        borderColor: "var(--grey-stroke)",
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "6px",
      backgroundColor: "var(--background-color)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#e0e0e0" : "transparent",
      color: "#333",
      padding: "10px",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#7a7a7a",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#7a7a7a",
    }),
  };

  return (
    <div className='textField' style={{ width: `${width}%` }}>
      <label htmlFor={id} className='textField--title'>{title}</label>
      <Select
        inputId={id}
        name={id} 
        required={required}
        options={options}
        value={selected}
        placeholder={placeholder}
        isSearchable
        styles={customStyles}
        onChange={handleChange}
      />
    </div>

  );
}