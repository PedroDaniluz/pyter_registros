import './InputField.css';
import InputMask from '@mona-health/react-input-mask';
import { useState } from 'react';

export default function InputField({ id, title, placeholder, type, mask, defaultValue, onChange, width = 100 }) {
    const [value, setValue] = useState('');

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
            newValue = formatCurrency(e.target.value);
        }

        setValue(newValue);

        if(onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className='textField' style={{ width: `${width}%` }}>
            <label htmlFor={id} className='textField--title'>{title}</label>

            {mask && mask !== "currency" && (
                <InputMask
                    className='textField--field'
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    mask={mask}
                    value = {value}
                    onChange = {handleChange}
                />
            )}

            {(!mask || mask === "currency") && (
                <input
                    className='textField--field'
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    value={mask === "currency" ? value : undefined}
                    min={0}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                />
            )}
        </div>
    );
}
