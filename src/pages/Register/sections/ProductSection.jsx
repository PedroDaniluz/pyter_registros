import { useEffect, useState } from 'react';
import InputField from '../../../components/InputField';
import SearchableDropdown from '../../../components/DropDown';
import SwitchButton from '../../../components/SwitchButton';
import { getProdutos, getVariacoes } from '../../../services/Api'

export default function ProductSection({ updateData }) {
    const [products, setProducts] = useState([{
        id: crypto.randomUUID(),
        produto: '',
        categoria: '',
        material: '',
        quantidade: 1,
        tamanho: '',
        preco: '',
        observacoes: '',
        adicionaisAtivos: false,
        adicionais: [],
        avaliableCategorias: [],
        avaliableMateriais: [],
        avaliableTamanhos: []
    }]);

    const [availableProdutos, setAvailableProdutos] = useState([]);
    const [variacoes, setVariacoes] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            const data = await getProdutos();
            setAvailableProdutos(data);
        };
        fetchProdutos();

        const fetchVariacoes = async () => {
            const data = await getVariacoes();
            setVariacoes(data);
        };
        fetchVariacoes();
    }, []);

    const handleChange = (id, key, value) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, [key]: value } : product
        ));
    };

    const handleProductChange = (id, key, value) => {
        const selectedProductId = value;
        const relevantVariacoes = variacoes.filter(v => v.id_produto === selectedProductId);

        const uniqueCategorias = Array.from(
            new Map(relevantVariacoes.map(v => [v.id_categoria, { id_categoria: v.id_categoria, nome: v.categoria }])).values()
        );
        const uniqueMateriais = Array.from(
            new Map(relevantVariacoes.map(v => [v.id_material, { id_material: v.id_material, nome: v.material }])).values()
        );
        const uniqueTamanhos = Array.from(
            new Set(relevantVariacoes.map(v => v.tamanho))
        );

        setProducts(products.map(product =>
            product.id === id ? {
                ...product,
                [key]: selectedProductId,
                categoria: '',
                material: '',
                tamanho: '',
                preco: '',
                avaliableCategorias: uniqueCategorias,
                avaliableMateriais: uniqueMateriais,
                avaliableTamanhos: uniqueTamanhos
            } : product
        ));
    };

    useEffect(() => {
        updateData(products);
    }, [products, updateData]);


    const addProduct = () => {
        setProducts([...products, {
            id: crypto.randomUUID(),
            produto: '',
            categoria: '',
            material: '',
            quantidade: 1,
            tamanho: '',
            preco: '',
            observacoes: '',
            adicionaisAtivos: false,
            adicionais: [],
            avaliableCategorias: [],
            avaliableMateriais: [],
            avaliableTamanhos: []
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

    const addAdicional = (productId) => {
        setProducts(products.map(product =>
            product.id === productId ? {
                ...product,
                adicionais: [...product.adicionais, { id: crypto.randomUUID(), adicional: '', valorAdicional: '' }]
            } : product
        ));
    };

    const removeAdicional = (productId) => {
        setProducts(products.map(product => {
            if (product.id === productId && product.adicionais.length > 0) {
                 const updatedAdicionais = product.adicionais.slice(0, -1);
                 const shouldDeactivate = updatedAdicionais.length === 0;
                return {
                    ...product,
                    adicionais: updatedAdicionais,
                    adicionaisAtivos: shouldDeactivate ? false : product.adicionaisAtivos
                 };
            }
            return product;
        }
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
                            id={`prod-${product.id}-produto`}
                            title={'Produto'}
                            placeholder={'Selecione'}
                            value={product.produto}
                            options={availableProdutos.map((i) => ({ value: i.id_produto, label: i.nome }))}
                            onChange={(value) => handleProductChange(product.id, 'produto', value)}
                        />
                        <SearchableDropdown
                            id={`prod-${product.id}-categoria`}
                            title={'Categoria'}
                            placeholder={'Selecione'}
                            value={product.categoria}
                            options={product.avaliableCategorias.map((i) => ({ value: i.id_categoria, label: i.nome }))}
                            onChange={(value) => handleChange(product.id, 'categoria', value)}
                            disabled={!product.produto}
                        />
                        <SearchableDropdown
                            id={`prod-${product.id}-material`}
                            title={'Material'}
                            placeholder={'Selecione'}
                            value={product.material}
                            options={product.avaliableMateriais.map((i) => ({ value: i.id_material, label: i.nome }))}
                            onChange={(value) => handleChange(product.id, 'material', value)}
                            disabled={!product.produto}
                        />
                        <SearchableDropdown
                            id={`prod-${product.id}-tamanho`}
                            title={'Tamanho'}
                            placeholder={''}
                            width={50}
                            value={product.tamanho}
                            options={product.avaliableTamanhos.map((tamanho) => ({ value: tamanho, label: tamanho }))}
                            onChange={(value) => handleChange(product.id, 'tamanho', value)}
                            disabled={!product.produto}
                        />
                        <InputField
                            id={`prod-${product.id}-quantidade`}
                            title={'Quantidade'}
                            type={'number'}
                            width={10}
                            defaultValue={product.quantidade}
                            value={product.quantidade}
                            min={1}
                            onChange={(value) => handleChange(product.id, 'quantidade', Math.max(1, parseInt(value, 10) || 1))}
                        />
                        <InputField
                            id={`prod-${product.id}-preco`}
                            title={'Preço'}
                            placeholder={'R$ 0,00'}
                            type={'text'}
                            width={10}
                            mask={'currency'}
                            value={product.preco}
                            onChange={(value) => handleChange(product.id, 'preco', value)}
                        />
                    </div>
                    <div className='stdIn--inputs'>
                        <InputField
                            id={`prod-${product.id}-observacoes`}
                            title={'Observações (opcional)'}
                            placeholder={'Insira os detalhes específicos do produto'}
                            required={false}
                            type={'text'}
                            value={product.observacoes}
                            onChange={(value) => handleChange(product.id, 'observacoes', value)}
                        />
                        <SwitchButton
                            id={`prod-${product.id}-adicionaisAtivos`}
                            title={'Adicionais'}
                            placeholder={'Adicionais pagos'}
                            width={25}
                            value={product.adicionaisAtivos}
                             onToggleChange={(value) => {
                                if (value && product.adicionais.length === 0) {
                                    addAdicional(product.id);
                                }
                                handleChange(product.id, 'adicionaisAtivos', value);
                            }}
                        />
                    </div>
                    {product.adicionaisAtivos && (
                        <>
                            {product.adicionais.map((adicional, index) => (
                                <div key={adicional.id} className='stdIn--inputs'>
                                    <SearchableDropdown
                                        id={`adicional-${product.id}-${adicional.id}-item`}
                                        title={'Adicional'}
                                        placeholder={'Selecione o item adicional'}
                                        value={adicional.adicional}
                                        onChange={(value) => handleAdicionalChange(product.id, index, 'adicional', value)}
                                    />
                                    <InputField
                                        id={`adicional-${product.id}-${adicional.id}-valor`}
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
                                {product.adicionais.length > 0 && (
                                    <button type='button' className='add-btn rmv' onClick={() => removeAdicional(product.id)}><u>- Remover adicional</u></button>
                                )}
                            </div>
                        </>
                    )}
                     <hr style={{borderTop: '1px solid #eee', margin: '15px 0'}}/>
                </div>
            ))}
            <button type='button' className='addProd-btn' onClick={addProduct}>Adicionar Produto</button>
        </div>
    );
}