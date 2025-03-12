import { useEffect, useId, useState } from 'react';
import InputField from '../../../components/InputField';
import SearchableDropdown from '../../../components/DropDown';
import SwitchButton from '../../../components/SwitchButton';
import { getProdutos } from '../../../services/Api'

export default function ProductSection({ updateData }) {
    const [products, setProducts] = useState([{
        id: useId(),
        produto: '',
        categoria: '',
        material: '',
        quantidade: 1,
        tamanho: '',
        preco: '',
        observacoes: '',
        adicionaisAtivos: false,
        adicionais: []
    }]);

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            const data = await getProdutos();
            setProdutos(data);
        };
        fetchProdutos();
    }, []);

    const handleChange = (id, key, value) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, [key]: value } : product
        ));
    };

    useEffect(() => {
        updateData(products);
    }, [products]);


    const addProduct = () => {
        setProducts([...products, {
            id: useId(),
            produto: '',
            categoria: '',
            material: '',
            quantidade: 1,
            tamanho: '',
            preco: 50,
            observacoes: '',
            adicionaisAtivos: false,
            adicionais: []
        }]);
    };

    const removeProduct = (id) => {
        if (products.length >= 2) {
            const confirmDelete = window.confirm("Tem certeza que deseja remover este produto?");
            if (confirmDelete) {
                setProducts(products.filter(product => product.id !== id));
            }
        } else {
            alert("É necessário ao menos 1 produto por pedido")
        }
    };

    const addAdicional = (id) => {
        setProducts(products.map(product =>
            product.id === id ? {
                ...product,
                adicionais: [...product.adicionais, { adicional: '', valorAdicional: '' }]
            } : product
        ));
    };

    const removeAdicional = (productId) => {
        setProducts(products.map(product =>
            product.id === productId ? {
                ...product,
                adicionais: product.adicionais.slice(0, -1)
            } : product
        ));
    };

    const handleAdicionalChange = (productId, index, key, value) => {
        setProducts(products.map(product =>
            product.id === productId ? {
                ...product,
                adicionais: product.adicionais.map((adicional, idx) =>
                    idx === index ? { ...adicional, [key]: value } : adicional
                )
            } : product
        ));
    };

    return (
        <div className='stdIn'>
            <h2>Produtos</h2>
            {products.map((product) => (
                <div className="product-inputs" key={product.id}>
                    <button type='button' onClick={() => removeProduct(product.id)} className='remove-btn'>
                        <img src="./src/assets/images/icons/darkVariants/remove.svg" alt="icone de X" />
                    </button>
                    <div className='stdIn--inputs'>
                        <SearchableDropdown
                            id={useId()}
                            title={'Produto'}
                            placeholder={'Selecione'}
                            value={product.produto}
                            options={produtos.map((i) => ({ value: i.id_produto, label: i.nome }))}
                            onChange={(value) => handleChange(product.id, 'produto', value)}
                        />
                        <SearchableDropdown
                            id={useId()}
                            title={'Categoria'}
                            placeholder={'Selecione'}
                            value={product.categoria}
                            onChange={(value) => handleChange(product.id, 'categoria', value)}
                        />
                        <SearchableDropdown
                            id={useId()}
                            title={'Material'}
                            placeholder={'Selecione'}
                            value={product.material}
                            onChange={(value) => handleChange(product.id, 'material', value)}
                        />
                        <InputField
                            id={useId()}
                            title={'Quantidade'}
                            type={'number'}
                            width={10}
                            value={product.quantidade}
                            defaultValue={product.quantidade}
                            onChange={(value) => handleChange(product.id, 'quantidade', value)}
                        />
                        <SearchableDropdown
                            id={useId()}
                            title={'Tamanho'}
                            placeholder={''}
                            width={50}
                            value={product.tamanho}
                            onChange={(value) => handleChange(product.id, 'tamanho', value)}
                        />
                        <InputField
                            id={useId()}
                            title={'Preço'}
                            placeholder={'R$ 0,00'}
                            type={'text'}
                            width={10}
                            mask={'currency'}
                            value={product.preco}
                            defaultValue={product.preco}
                            onChange={(value) => handleChange(product.id, 'preco', value)}
                        />
                    </div>
                    <div className='stdIn--inputs'>
                        <InputField
                            id={useId()}
                            title={'Observações (opcional)'}
                            placeholder={'Insira os detalhes específicos do produto'}
                            required={false}
                            type={'text'}
                            value={product.observacoes}
                            onChange={(value) => handleChange(product.id, 'observacoes', value)}
                        />
                        <SwitchButton
                            title={'Adicionais'}
                            placeholder={'Adicionais pagos'}
                            width={25}
                            value={product.adicionaisAtivos}
                            onToggleChange={(value) => handleChange(product.id, 'adicionaisAtivos', value)}
                        />
                    </div>
                    {product.adicionaisAtivos && (
                        <>
                            {product.adicionais.map((adicional, index) => (
                                <div key={index} className='stdIn--inputs'>
                                    <SearchableDropdown
                                        id={useId()}
                                        title={'Adicional'}
                                        placeholder={'Selecione o item adicional'}
                                        value={adicional.adicional}
                                        onChange={(value) => handleAdicionalChange(product.id, index, 'adicional', value)}
                                    />
                                    <InputField
                                        id={useId()}
                                        title={'Valor'}
                                        placeholder={'R$'}
                                        type={'text'}
                                        width={25}
                                        mask={'currency'}
                                        value={adicional.valorAdicional}
                                        onChange={(value) => handleAdicionalChange(product.id, index, 'valorAdicional', value)}
                                    />
                                </div>
                            ))}
                            <div className='add-btns'>
                                <button type='button' className='add-btn add' onClick={() => addAdicional(product.id)}><u>+ Inserir adicional</u></button>
                                <button type='button' className='add-btn rmv' onClick={() => removeAdicional(product.id)}><u>- Remover adicional</u></button>
                            </div>
                        </>
                    )}
                </div>
            ))}
            <button type='button' className='addProd-btn' onClick={addProduct}>Adicionar Produto</button>
        </div>
    );
}
