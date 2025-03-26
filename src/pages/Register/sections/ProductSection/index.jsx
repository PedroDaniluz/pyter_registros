import { useEffect, useState } from 'react';
import { getProdutos, getVariacoes } from '../../../../services/Api';
import ProductItem from './ProductItem';

const createEmptyProduct = () => ({
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
});

export default function ProductSection({ updateData }) {
    const [products, setProducts] = useState([createEmptyProduct()]);
    const [availableProdutos, setAvailableProdutos] = useState([]);
    const [variacoes, setVariacoes] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [produtosData, variacoesData] = await Promise.all([
                    getProdutos(),
                    getVariacoes()
                ]);
                setAvailableProdutos(produtosData || []);
                setVariacoes(variacoesData || []);
            } catch (error) {
                console.error("Erro ao buscar dados iniciais:", error);
            }
        };
        fetchData();
    }, []);


    const calculatePrice = (product) => {
        if (!product) return '0.00';

        let basePrice = 0;
        if (product.produto && product.categoria && product.material && product.tamanho && variacoes.length > 0) {
            const foundVariacao = variacoes.find(v =>
                v.id_produto === product.produto &&
                v.id_categoria === product.categoria &&
                v.id_material === product.material &&
                v.tamanho === product.tamanho
            );
            if (foundVariacao && foundVariacao.preco) {
                basePrice = parseFloat(foundVariacao.preco) || 0;
            }
        }

        let adicionaisPrice = (product.adicionais ?? []).reduce((total, adicional) => {
            const cleanValue = adicional.valorAdicional?.toString().replace(/[^0-9,-]+/g, "").replace(",", ".") || "0";
            return total + (parseFloat(cleanValue) || 0);
        }, 0);

        const quantity = Math.max(1, parseInt(product.quantidade, 10) || 1);

        return ((basePrice + adicionaisPrice) * quantity).toFixed(2);
    };


    const updateProductField = (id, key, value, skipPriceCalc = false) => {
        setProducts(prevProducts => prevProducts.map(product => {
            if (product.id === id) {
                const updatedProduct = { ...product, [key]: value };
                if (!skipPriceCalc) {
                    updatedProduct.preco = calculatePrice(updatedProduct);
                }
                return updatedProduct;
            }
            return product;
        }));
    };

    const handleProductChange = (id, key, selectedProductId) => {
        const relevantVariacoes = (variacoes ?? []).filter(v => v.id_produto === selectedProductId);

        const uniqueCategorias = Array.from(new Map(relevantVariacoes.map(v => [v.id_categoria, { id_categoria: v.id_categoria, nome: v.categoria }])).values());
        const uniqueMateriais = Array.from(new Map(relevantVariacoes.map(v => [v.id_material, { id_material: v.id_material, nome: v.material }])).values());
        const uniqueTamanhos = Array.from(new Set(relevantVariacoes.map(v => v.tamanho).filter(t => t)));

        setProducts(prevProducts => prevProducts.map(product => {
            if (product.id === id) {
                const updatedProduct = {
                    ...product,
                    [key]: selectedProductId,
                    categoria: '',
                    material: '',
                    tamanho: '',
                    preco: '',
                    avaliableCategorias: uniqueCategorias,
                    avaliableMateriais: uniqueMateriais,
                    avaliableTamanhos: uniqueTamanhos
                };
                updatedProduct.preco = calculatePrice(updatedProduct);
                return updatedProduct;
            }
            return product;
        }));
    };

    const handleChange = (id, key, value) => {
        updateProductField(id, key, value);
    };

    const addProduct = () => {
        setProducts(prevProducts => [...prevProducts, createEmptyProduct()]);
    };

    const removeProduct = (id) => {
        if (products.length >= 2) {
            if (window.confirm("Tem certeza que deseja remover este produto?")) {
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            }
        } else {
            alert("É necessário ao menos 1 produto por pedido");
        }
    };

    const addAdicional = (productId) => {
        setProducts(prevProducts => prevProducts.map(product => {
            if (product.id === productId) {
                 const newAdicionais = [...(product.adicionais ?? []), { id: crypto.randomUUID(), adicional: '', valorAdicional: '' }];
                 return { ...product, adicionais: newAdicionais };
            }
            return product;
        }));
    };

    const removeAdicional = (productId) => {
        setProducts(prevProducts => prevProducts.map(product => {
            if (product.id === productId && (product.adicionais ?? []).length > 0) {
                const updatedAdicionais = product.adicionais.slice(0, -1);
                const shouldDeactivate = updatedAdicionais.length === 0;
                const updatedProduct = {
                    ...product,
                    adicionais: updatedAdicionais,
                    adicionaisAtivos: shouldDeactivate ? false : product.adicionaisAtivos
                };
                updatedProduct.preco = calculatePrice(updatedProduct);
                return updatedProduct;
            }
            return product;
        }));
    };

    const handleAdicionalChange = (productId, index, key, value) => {
        setProducts(prevProducts => prevProducts.map(product => {
            if (product.id === productId) {
                const updatedAdicionais = (product.adicionais ?? []).map((adicional, idx) =>
                    idx === index ? { ...adicional, [key]: value } : adicional
                );
                const updatedProduct = { ...product, adicionais: updatedAdicionais };
                updatedProduct.preco = calculatePrice(updatedProduct);
                return updatedProduct;
            }
            return product;
        }));
    };

    const handleToggleAdicionais = (productId, isActive) => {
         setProducts(prevProducts => prevProducts.map(product => {
            if (product.id === productId) {
                let updatedProduct = { ...product, adicionaisAtivos: isActive };

                 if (isActive && (updatedProduct.adicionais ?? []).length === 0) {
                     updatedProduct = {...updatedProduct, adicionais: [{ id: crypto.randomUUID(), adicional: '', valorAdicional: '' }]};
                 } else if (!isActive) {
                     updatedProduct.preco = calculatePrice(updatedProduct);
                 }
                 return updatedProduct;
            }
            return product;
        }));
    };

    useEffect(() => {
        if (updateData && typeof updateData === 'function') {
            updateData(products);
        }
    }, [products, updateData]);

    const availableProdutosOptions = (availableProdutos ?? []).map(p => ({ value: p.id_produto, label: p.nome }));

    return (
        <div className='stdIn'>
            <h2>Produtos</h2>
            {(products ?? []).map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    availableProdutosOptions={availableProdutosOptions}
                    onRemove={removeProduct}
                    onChange={handleChange}
                    onProductChange={handleProductChange}
                    onToggleAdicionais={handleToggleAdicionais}
                    onAddAdicional={addAdicional}
                    onRemoveAdicional={removeAdicional}
                    onAdicionalChange={handleAdicionalChange}
                />
            ))}
            <button type='button' className='addProd-btn' onClick={addProduct}>Adicionar Produto</button>
        </div>
    );
}