import { useState } from 'react';
import SearchableDropdown from '../../../components/DropDown';
import InputField from '../../../components/InputField';

export default function OrderSection() {
    const[orderData, setOrderData] = useState({
        data: '',
        prazo: '',
        instituicao: ''
    });

    const handleChange = (key, value) => {
        setOrderData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    return (
        <section className='stdIn'>
            <h2>Pedido</h2>
            <form className='stdIn--inputs'>
                <InputField 
                    title='Data' 
                    placeholder='Insira o nome do cliente'
                    type={'date'} 
                    required
                    width={50}
                    onChange={(value) => handleChange('data', value)}
                />
                <InputField 
                    title='Prazo (opcional)' 
                    placeholder='Insira o telefone do cliente'
                    type={'date'} 
                    required
                    width={50} 
                    onChange={(value) => handleChange('prazo', value)}
                />
                <SearchableDropdown 
                    title={'Instituição'} 
                    placeholder={'Selecione a instituição'} 
                    onChange={(value) => handleChange('instituicao', value)}
                />
            </form>
        </section>
    )
}