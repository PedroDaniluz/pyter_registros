import './InputField.css';
import InputMask from '@mona-health/react-input-mask';
import { useState } from 'react';

export default function InputField({ id, title, placeholder, required = true, type, mask, defaultValue, onChange, width = 100 }) {
    const [value, setValue] = useState(defaultValue || '');


    const formatCurrency = (input) => {
        let num = input.replace(/\D/g, '');
        let formatted = (Number(num) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        return formatted;
    };
 

    const handleChange = (e) => {
        let newValue = e.target.value;

        if (mask === "currency") {
            newValue = formatCurrency(newValue);
        }

        setValue(newValue);

        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="textField" style={{ width: `${width}%` }}>
            <label htmlFor={id} className="textField--title">{title}</label>

            {mask && mask !== "currency" ? (
                // Com máscara aplicada
                <InputMask
                    id={id}
                    required={required}
                    className="textField--field"
                    type={type}
                    placeholder={placeholder}
                    mask={mask}
                    value={value}
                    onChange={handleChange}
                />
            ) : (
                <input
                    id={id}
                    required={required}
                    className="textField--field"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    min={1}
                    onChange={handleChange}
                />
            )}
        </div>
    );
}
