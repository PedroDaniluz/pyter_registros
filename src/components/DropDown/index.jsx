import { useState } from "react";
import Select from "react-select";
import '../../components/InputField/InputField.css'

const options = [
  { value: "Franco Montoro", label: "Franco Montoro" },
  { value: "Marianinha", label: "Marianinha" },
  { value: "Buscariolli", label: "Buscariolli" },
];


export default function SearchableDropdown({title, placeholder, width = 100}) {
  const [selected, setSelected] = useState();

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
        <label className='textField--title'>{title}</label>
        <Select
            options={options}
            value={selected}
            onChange={setSelected}
            placeholder={placeholder}
            isSearchable
            styles={customStyles}
        />
    </div>
    
  );
}