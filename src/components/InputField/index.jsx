import './InputField.css';
import InputMask from '@mona-health/react-input-mask';
import { useState } from 'react';

export default function InputField({ title, placeholder, type, id, mask, width = 100, defaultValue, onChange}) {
    const [value, setValue] = useState('');

    const formatCurrency = (input) => {
        let num = input.replace(/\D/g, ''); // Remove tudo que não for número
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
                    mask={mask}
                    type={type}
                    id={id}
                    value = {value}
                    placeholder={placeholder}
                    onChange = {handleChange}
                    className='textField--field'
                />
            )}

            {(!mask || mask === "currency") && (
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className='textField--field'
                    value={mask === "currency" ? value : undefined}
                    min={0}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                />
            )}
        </div>
    );
}
