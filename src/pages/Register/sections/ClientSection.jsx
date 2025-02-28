import { useState } from 'react';
import InputField from '../../../components/InputField';

export default function ClientSection() {
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

    return (
        <section className='stdIn'>
            <h2>Clientes</h2>
            <div className='stdIn--inputs'>
                <InputField 
                    title='Telefone' 
                    placeholder='Insira o telefone do cliente' 
                    id={'tel'} type={'text'} 
                    mask={'(99) 99999-9999'} 
                    width={80} 
                    onChange={(value) => handleChange('telefone', value)}
                />
                <InputField 
                    title='Nome' 
                    placeholder='Insira o nome do cliente' 
                    id={'nome'} type={'text'} 
                    onChange={(value) => handleChange('nome', value)}
                />
                <InputField 
                    title='Email (opcional)' 
                    placeholder='Insira o email do cliente' 
                    id={'email'} 
                    type={'email'} 
                    onChange={(value) => handleChange('email', value)}
                />
            </div>
        </section>
    )
}