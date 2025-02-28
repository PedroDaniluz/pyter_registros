import { useState } from 'react';
import InputField from '../../../components/InputField';
import SearchableDropdown from '../../../components/DropDown';
import SwitchButton from '../../../components/SwitchButton';

export default function ProductSection() {
    const [products, setProducts] = useState([{
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
    }]);

    const handleChange = (index, key, value) => {
        const newProducts = [...products];
        newProducts[index][key] = value;
        setProducts(newProducts);
    };

    const addProduct = () => {
        setProducts([...products, {
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
        }]);
    };

    return (
        <section className='stdIn'>
            <h2>Produtos</h2>
            {products.map((product, index) => (
                <div className="product-inputs" key={index}>
                    <div className='stdIn--inputs'>
                        <SearchableDropdown 
                            title={'Produto'} 
                            placeholder={'Selecione'} 
                            value={product.produto}
                            onChange={(value) => handleChange(index, 'produto', value)} 
                        />
                        <SearchableDropdown 
                            title={'Categoria'} 
                            placeholder={'Selecione'} 
                            value={product.categoria}
                            onChange={(value) => handleChange(index, 'categoria', value)} 
                        />
                        <SearchableDropdown 
                            title={'Material'} 
                            placeholder={'Selecione'} 
                            value={product.material}
                            onChange={(value) => handleChange(index, 'material', value)} 
                        />
                        <InputField 
                            title='Quantidade' 
                            id={'qnt'} 
                            type={'number'} 
                            width={10} 
                            value={product.quantidade}
                            onChange={(e) => handleChange(index, 'quantidade', e.target.value)} 
                        />
                        <SearchableDropdown 
                            title={'Tamanho'} 
                            placeholder={''} 
                            width={50} 
                            value={product.tamanho}
                            onChange={(value) => handleChange(index, 'tamanho', value)} 
                        />
                        <InputField 
                            title='Preço' 
                            placeholder='R$' 
                            id={'preco'} 
                            type={'text'} 
                            width={10} 
                            mask={'currency'} 
                            value={product.preco}
                            onChange={(e) => handleChange(index, 'preco', e.target.value)} 
                        />
                    </div>
                    <div className='stdIn--inputs'>
                        <InputField 
                            title='Observações (opcional)' 
                            placeholder='Insira os detalhes específicos do produto' 
                            id={'obs'} 
                            type={'text'} 
                            value={product.observacoes}
                            onChange={(e) => handleChange(index, 'observacoes', e.target.value)} 
                        />
                        <SwitchButton 
                            title={'Adicionais'} 
                            placeholder={'Adicionais pagos'} 
                            width={25} 
                            value={product.adicionaisAtivos}
                            onToggleChange={(value) => handleChange(index, 'adicionaisAtivos', value)} 
                        />
                    </div>
                    {product.adicionaisAtivos && (
                        <div className='stdIn--inputs'>
                            <SearchableDropdown 
                                title={'Adicional'} 
                                placeholder={'Selecione o item adicional'} 
                                value={product.adicional}
                                onChange={(value) => handleChange(index, 'adicional', value)} 
                            />
                            <InputField 
                                title='Valor' 
                                placeholder='R$' 
                                id={'valor'} 
                                type={'text'} 
                                width={25} 
                                mask={'currency'} 
                                value={product.valorAdicional}
                                onChange={(e) => handleChange(index, 'valorAdicional', e.target.value)} 
                            />
                        </div>
                    )}
                </div>
            ))}
            <button onClick={addProduct}>Adicionar Produto</button>
            <button onClick={() => console.log(products)}>Salvar</button>
        </section>
    );
}
