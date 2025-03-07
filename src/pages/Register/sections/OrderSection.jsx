import { useState, useEffect } from 'react';
import SearchableDropdown from '../../../components/DropDown';
import InputField from '../../../components/InputField';
import { getInstituicoes } from '../../../services/Api'

export default function OrderSection({ updateData }) {
    const [orderData, setOrderData] = useState({
        data: '',
        prazo: '',
        instituicao: ''
    });

    const [instituicoes, setInstituicoes] = useState([]);

    useEffect(() => {
        const fetchInstituicoes = async () => {
            const data = await getInstituicoes();
            setInstituicoes(data);
        };
        fetchInstituicoes();
    }, []);

    const handleChange = (key, value) => {
        setOrderData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    useEffect(() => {
        updateData(orderData);
    }, [orderData]);

    return (
        <section className='stdIn'>
            <h2>Pedido</h2>
            <div className='stdIn--inputs'>
                <InputField 
                    title='Data'
                    type={'date'} 
                    required
                    width={50}
                    onChange={(value) => handleChange('data', value)}
                />
                <InputField 
                    title='Prazo (opcional)'
                    type={'date'} 
                    required={false}
                    width={50} 
                    onChange={(value) => handleChange('prazo', value)}
                />
                <SearchableDropdown 
                    options={instituicoes.map((i) => ({ value: i.id_instituicao, label: i.nome }))}
                    title={'Instituição (opcional)'}
                    placeholder={'Selecione a instituição'}
                    required={false}
                    onChange={(value) => handleChange('instituicao', value)}
                />
            </div>
        </section>
    );
}
