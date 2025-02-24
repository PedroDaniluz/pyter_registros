import './InputField.css';
import InputMask from '@mona-health/react-input-mask';
import { useState } from 'react';

export default function InputField({ title, placeholder, type, id, mask, width = 100 }) {
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
        if (mask === "currency") {
            setValue(formatCurrency(e.target.value));
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
                    placeholder={placeholder}
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
                    onChange={handleChange}
                />
            )}
        </div>
    );
}
