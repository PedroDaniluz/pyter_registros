import './InputField.css';
import InputMask from '@mona-health/react-input-mask';
import { useState, useEffect } from 'react';

export default function InputField({id, title, placeholder, required = true, disabled = false, type, mask, defaultValue, onChange, width = 100, min }) {
    const [value, setValue] = useState(defaultValue ?? ''); 
    
    useEffect(() => {
       const defaultVal = defaultValue ?? '';
       if (defaultVal !== value) {
           setValue(defaultVal);
       }
    }, [defaultValue]);

const formatCurrency = (input) => {
    let num = input.replace(/\D/g, '');
    if (!num || num === '0') return 'R$ 0,00';
    let formatted = (Number(num) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formatted;
};

const handleChange = (e) => {
    let newValueFromInput = e.target.value;
    let valueToSetAndNotify;
    if (mask === "currency") {
        const rawDigits = newValueFromInput.replace(/\D/g, '');
        const formattedValue = formatCurrency(rawDigits);
        valueToSetAndNotify = formattedValue;

    } else {
        valueToSetAndNotify = newValueFromInput;
    }
    setValue(valueToSetAndNotify);

    if (onChange) {
        onChange(valueToSetAndNotify);
    }
};

    const isCurrency = mask === "currency";

    return (
        <div className="textField" style={{ width: `${width}%` }}>
            <label htmlFor={id} className="textField--title" disabled={disabled}>{title}</label>

            {mask && !isCurrency ? (
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
            ) : isCurrency ? (
                 <input
                    disabled={disabled}
                    id={id}
                    required={required}
                    className="textField--field"
                    type={'text'}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                 />
            ) : (
                <input
                    disabled={disabled}
                    id={id}
                    required={required}
                    className="textField--field"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    min={type === 'number' ? min : undefined}
                    onChange={handleChange}
                    step={type === 'number' ? 1 : undefined}
                />
            )}
        </div>
    );
}