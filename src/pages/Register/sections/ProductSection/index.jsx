import { useEffect, useState } from 'react';
import { getVariacoes } from '../../../../services/Api';
import ProductItem from './ProductItem';

const createEmptyProduct = () => ({
    id: crypto.randomUUID(),
    produto: null,
    id_variacao: null,
    quantidade: 1,
    preco_base: 0,
    observacoes: null,
    adicionaisAtivos: false,
    adicionais: [],
});

export default function ProductSection({ updateData }) {
    const [products, setProducts] = useState([createEmptyProduct()]);
    const [variacoes, setVariacoes] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const variacoesData = await getVariacoes();
                setVariacoes(variacoesData || []);
            } catch (error) {
                console.error("Erro ao buscar dados iniciais:", error);
            }
        };
        fetchData();
    }, []);


    const calculatePrice = (product) => {
        if (!product) return '0.00';

        if (
            product.produto &&
            product.categoria &&
            product.material &&
            product.tamanho
        ) {
            const produtoEncontrado = variacoes.find(p => p.produto === product.produto);
            const categoriaEncontrada = produtoEncontrado?.categorias.find(c => c.categoria === product.categoria);
            const materialEncontrado = categoriaEncontrada?.materiais.find(m => m.material === product.material);
            const variacaoEncontrada = materialEncontrado?.variacoes.find(v => v.tamanho === product.tamanho);

            if (variacaoEncontrada) {
                product.id_variacao = variacaoEncontrada.id;
                product.preco_base = variacaoEncontrada.preco || 0;
            } else {
                product.preco_base = 0;
            }
        }


        let adicionaisPrice = (product.adicionais ?? []).reduce((total, adicional) => {
            const cleanValue = adicional.valorAdicional?.toString().replace(/[^0-9,-]+/g, "").replace(",", ".") || "0";
            return total + (parseFloat(cleanValue) || 0);
        }, 0);

        const quantity = Math.max(1, parseInt(product.quantidade, 10) || 1);

        return ((product.preco_base + adicionaisPrice) * quantity).toFixed(2);
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

                if (isActive) {
                    if ((updatedProduct.adicionais ?? []).length === 0) {
                        updatedProduct.adicionais = [{ id: crypto.randomUUID(), adicional: '', valorAdicional: 'R$ 0,00' }];
                    }
                } else {
                    updatedProduct.adicionais = [];
                }

                updatedProduct.preco = calculatePrice(updatedProduct);

                return updatedProduct;
            }
            return product;
        }));
    };


    useEffect(() => {
        updateData(products);
    }, [products, updateData]);

    return (
        <div className='inputCard'>
            <h2>Produtos</h2>
            {(products ?? []).map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    availableProdutosOptions={variacoes}
                    onRemove={removeProduct}
                    onChange={handleChange}
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