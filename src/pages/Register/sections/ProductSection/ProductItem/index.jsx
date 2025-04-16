import { useState, useEffect } from 'react';
import InputField from '../../../../../components/InputField';
import SearchableDropdown from '../../../../../components/DropDown';
import SwitchButton from '../../../../../components/SwitchButton';
import PriceBox from '../../../../../components/PriceBox';
import removeIcon from '../../../../../assets/images/icons/darkVariants/remove.svg';

export default function ProductItem({
    product,
    availableProdutosOptions,
    onRemove,
    onChange,
    onToggleAdicionais,
    onAddAdicional,
    onRemoveAdicional,
    onAdicionalChange,
}) {
    const produtosDisponiveis = availableProdutosOptions.map((p) => ({ value: p.produto, label: p.produto }))
    const [categoriasDisponiveis, setCategoriasDisponiveis] = useState([]);
    const [materiaisDisponiveis, setMateriaisDisponiveis] = useState([]);
    const [tamanhosDisponiveis, setTamanhosDisponiveis] = useState([]);

    useEffect(() => {
        const produtoSelecionado = availableProdutosOptions.find(
            (p) => p.produto === product.produto
        );

        if (produtoSelecionado) {
            const categorias = produtoSelecionado.categorias.map((cat) => ({
                value: cat.categoria,
                label: cat.categoria,
                materiais: cat.materiais,
                tamanhos: cat.tamanhos,
            }));
            setCategoriasDisponiveis(categorias);
        } else {
            setCategoriasDisponiveis([]);
            setMateriaisDisponiveis([]);
            setTamanhosDisponiveis([]);
        }
    }, [product.produto, availableProdutosOptions]);

    useEffect(() => {
        const categoriaSelecionada = categoriasDisponiveis.find(
            (cat) => cat.value === product.categoria
        );

        if (categoriaSelecionada) {
            const materiaisMapeados = categoriaSelecionada.materiais.map((mat) => ({
                value: mat.material,
                label: mat.material,
                variacoes: mat.variacoes,
            }));

            setMateriaisDisponiveis(materiaisMapeados);

            const materialSelecionado = materiaisMapeados.find(
                (m) => m.value === product.material
            );

            if (materialSelecionado) {
                setTamanhosDisponiveis(
                    materialSelecionado.variacoes.map((v) => ({
                        value: v.tamanho,
                        label: v.tamanho,
                        preco: v.preco,
                    }))
                );
            } else {
                setTamanhosDisponiveis([]);
            }
        } else {
            setMateriaisDisponiveis([]);
            setTamanhosDisponiveis([]);
        }
    }, [product.categoria, product.material, categoriasDisponiveis]);


    const handleInputChange = (key, value, x = null) => {
        onChange(product.id, key, value, x);
    };

    const handleAdicionalInputChange = (index, key, value) => {
        onAdicionalChange(product.id, index, key, value);
    };

    return (
        <div className="product-inputs">
            <button type='button' onClick={() => onRemove(product.id)} className='remove-btn'>
                <img src={removeIcon} alt="icone de X" />
            </button>

            <div className='stdIn--inputs'>
                <SearchableDropdown
                    id={`prod-${product.id}-produto`}
                    title={'Produto'}
                    placeholder={'Selecione'}
                    value={product.produto}
                    options={produtosDisponiveis}
                    onChange={(value) => handleInputChange('produto', value)}
                    isClearable
                />
                <SearchableDropdown
                    id={`prod-${product.id}-categoria`}
                    title={'Categoria'}
                    placeholder={'Selecione'}
                    value={product.categoria}
                    options={categoriasDisponiveis}
                    onChange={(value) => handleInputChange('categoria', value)}
                    disabled={!product.produto}
                />
                <SearchableDropdown
                    id={`prod-${product.id}-material`}
                    title={'Material'}
                    placeholder={'Selecione'}
                    value={product.material}
                    options={materiaisDisponiveis}
                    onChange={(value) => handleInputChange('material', value)}
                    disabled={!product.categoria}
                />
                <SearchableDropdown
                    id={`prod-${product.id}-tamanho`}
                    title={'Tamanho'}
                    placeholder={'Selecione'}
                    width={100}
                    value={product.tamanho}
                    options={tamanhosDisponiveis}
                    onChange={(value) => handleInputChange('tamanho', value)}
                    disabled={!product.material}
                />
                <InputField
                    id={`prod-${product.id}-quantidade`}
                    title={'Quantidade'}
                    type={'number'}
                    width={10}
                    value={product.quantidade}
                    defaultValue={product.quantidade}
                    min={1}
                    onChange={(value) => handleInputChange('quantidade', Math.max(1, parseInt(value, 10) || 1))}
                />
                <PriceBox
                    id={`prod-${product.id}-preco`}
                    title={'Preço'}
                    value={product.preco}
                    width={10}
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
                    onChange={(value) => handleInputChange('observacoes', value)}
                />
                <SwitchButton
                    id={`prod-${product.id}-adicionaisAtivos`}
                    title={'Adicionais'}
                    placeholder={'Adicionais pagos'}
                    width={25}
                    value={product.adicionaisAtivos}
                    onToggleChange={(value) => onToggleAdicionais(product.id, value)}
                />
            </div>

            {product.adicionaisAtivos && (
                <>
                    {(product.adicionais ?? []).map((adicional, index) => (
                        <div key={adicional.id} className='stdIn--inputs'>
                            <InputField
                                id={`adicional-${product.id}-${adicional.id}-item`}
                                title={'Adicional'}
                                type={'text'}
                                placeholder={'Descreva o adicional'}
                                value={adicional.adicional}
                                onChange={(value) => handleAdicionalInputChange(index, 'adicional', value)}
                            />
                            <InputField
                                id={`adicional-${product.id}-${adicional.id}-valor`}
                                title={'Valor'}
                                type={'text'}
                                width={25}
                                mask={'currency'}
                                value={adicional.valorAdicional}
                                defaultValue={adicional.valorAdicional}
                                onChange={(value) => handleAdicionalInputChange(index, 'valorAdicional', value)}
                            />
                        </div>
                    ))}
                    <div className='add-btns'>
                        <button type='button' className='add-btn add' onClick={() => onAddAdicional(product.id)}><u>+ Inserir adicional</u></button>
                        {(product.adicionais ?? []).length > 0 && (
                            <button type='button' className='add-btn rmv' onClick={() => onRemoveAdicional(product.id)}><u>- Remover adicional</u></button>
                        )}
                    </div>
                </>
            )}

            <hr style={{ borderTop: '1px solid #eee', margin: '15px 0' }} />
        </div>
    );
}