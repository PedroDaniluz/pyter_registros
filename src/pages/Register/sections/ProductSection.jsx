import { useState } from 'react'
import InputField from '../../../components/InputField'
import SearchableDropdown from '../../../components/DropDown'
import SwitchButton from '../../../components/SwitchButton'

function extractFloat(value) {
    return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
}

export default function ProductSection() {
    const [productData, setProductData] = useState({
        produto: '',
        categoria: '',
        material: '',
        quantidade: 1,
        tamanho: '',
        preco: '',
        observacoes: '',
        adicionaisAtivos: false,
        adicional: '',
        valorAdicional: ''
    });

    const handleChange = (key, value) => {
        setProductData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    return (
        <section className='stdIn'>
            <h2>Produtos</h2>
            <div className='stdIn--inputs'>
                <SearchableDropdown 
                    title={'Produto'} 
                    placeholder={'Selecione'} 
                    onChange={(value) => handleChange('produto', value)} 
                />
                <SearchableDropdown 
                    title={'Categoria'} 
                    placeholder={'Selecione'} 
                    onChange={(value) => handleChange('categoria', value)} 
                />
                <SearchableDropdown 
                    title={'Material'} 
                    placeholder={'Selecione'} 
                    onChange={(value) => handleChange('material', value)} 
                />
                <InputField 
                    title='Quantidade' 
                    id={'qnt'} 
                    type={'number'} 
                    width={10} 
                    defaultValue={1}
                    onChange={(value) => handleChange('quantidade', value)} 
                />
                <SearchableDropdown 
                    title={'Tamanho'} 
                    placeholder={''} 
                    width={50} 
                    onChange={(value) => handleChange('tamanho', value)} 
                />
                <InputField 
                    title='Preço' 
                    placeholder='R$ 0,00' 
                    id={'preco'} 
                    type={'text'} 
                    width={10} 
                    mask={'currency'} 
                    onChange={(value) => handleChange('preco', extractFloat(value))} 
                />
            </div>
            <div className='stdIn--inputs'>
                <InputField 
                    title='Observações (opcional)' 
                    placeholder='Insira os detalhes específicos do produto' 
                    id={'obs'} 
                    type={'text'} 
                    onChange={(value) => handleChange('observacoes', value)} 
                />
                <SwitchButton 
                    title={'Adicionais'} 
                    placeholder={'Adicionais pagos'} 
                    width={25} 
                    onToggleChange={(value) => handleChange('adicionaisAtivos', value)} 
                />
            </div>
            {formData.adicionaisAtivos && (
                <div className='stdIn--inputs'>
                    <SearchableDropdown 
                        title={'Adicional'} 
                        placeholder={'Selecione o item adicional'} 
                        onChange={(value) => handleChange('adicional', value)} 
                    />
                    <InputField 
                        title='Valor' 
                        placeholder='R$ 0,00' 
                        id={'valor'} 
                        type={'text'} 
                        width={25} 
                        mask={'currency'} 
                        onChange={(value) => handleChange('valorAdicional', value)} 
                    />
                </div>
            )}
            <button onClick={() => console.log(productData)}>Salvar</button>
        </section>
    );
}
