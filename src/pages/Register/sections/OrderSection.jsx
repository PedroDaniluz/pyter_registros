import { useState, useEffect, useId } from 'react';
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
        <section className='inputCard'>
            <h2>Pedido</h2>
            <div className='inputCard--fields'>
                <InputField
                    id={useId()}
                    title='Data'
                    type={'date'}
                    required
                    width={50}
                    onChange={(value) => handleChange('data', value)}
                />
                <InputField
                    id={useId()}
                    title='Prazo (opcional)'
                    type={'date'}
                    required={false}
                    width={50}
                    onChange={(value) => handleChange('prazo', value)}
                />
                <SearchableDropdown
                    id={useId()}
                    options={instituicoes.map((i) => ({ value: i.id_instituicao, label: i.instituicao }))}
                    title={'Instituição (opcional)'}
                    placeholder={'Selecione a instituição'}
                    required={false}
                    value={orderData.instituicao}
                    onChange={(value) => handleChange('instituicao', value)}
                    isClearable
                />
            </div>
        </section>
    );
}
