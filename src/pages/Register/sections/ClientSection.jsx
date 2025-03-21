import { useEffect, useId, useState } from 'react';
import InputField from '../../../components/InputField';

export default function ClientSection({ updateData }) {
    const [clientData, setClientData] = useState({
        nome: '',
        telefone: '',
        email: ''
    });

    const handleChange = (key, value) => {
        setClientData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    useEffect(() => {
        updateData(clientData);
    }, [clientData]);

    return (
        <section className='stdIn'>
            <h2>Clientes</h2>
            <div className='stdIn--inputs'>
                <InputField
                    id={useId()}
                    title='Telefone'
                    placeholder='Insira o telefone do cliente'
                    type={'text'}
                    mask={'(99) 99999-9999'}
                    width={80}
                    onChange={(value) => handleChange('telefone', value)}
                    onInvalid={(e) => e.target.setCustomValidity("Este campo é obrigatório")}
                />
                <InputField
                    id={useId()}
                    title='Nome'
                    placeholder='Insira o nome do cliente'
                    type={'text'}
                    onChange={(value) => handleChange('nome', value)}
                />
                <InputField
                    id={useId()}
                    title='Email (opcional)'
                    placeholder='Insira o email do cliente'
                    type={'email'}
                    onChange={(value) => handleChange('email', value)}
                />
            </div>
        </section>
    )
}