import { useMemo } from "react";
import Select from "react-select";
import '../../components/InputField/InputField.css'

const a = [
  { value: "0", label: "Testeete" },
];


export default function SearchableDropdown({ id, title, placeholder, options = a, required = true, onChange, width = 100, value, isClearable = false, disabled = false }) {

  const selectedOption = useMemo(() => {
    if (value === null || value === undefined || value === '') {
       return null;
    }
    return options.find(option => option.value === value) || null;
}, [options, value]);


const handleChange = (selectedOptionParam) => {
    if (onChange) {
        onChange(selectedOptionParam ? selectedOptionParam.value : null);
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
        value={selectedOption}
        placeholder={placeholder}
        isSearchable
        isClearable={isClearable}
        isDisabled={disabled}
        styles={customStyles}
        onChange={handleChange}
      />
    </div>

  );
}