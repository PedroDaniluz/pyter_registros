import React from 'react';
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
    onProductChange,
    onToggleAdicionais,
    onAddAdicional,
    onRemoveAdicional,
    onAdicionalChange,
}) {

    const handleInputChange = (key, value) => {
        onChange(product.id, key, value);
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
                    options={availableProdutosOptions}
                    onChange={(value) => onProductChange(product.id, 'produto', value)}
                    isClearable
                />
                <SearchableDropdown
                    id={`prod-${product.id}-categoria`}
                    title={'Categoria'}
                    placeholder={'Selecione'}
                    value={product.categoria}
                    options={(product.avaliableCategorias ?? []).map((i) => ({ value: i.id_categoria, label: i.nome }))}
                    onChange={(value) => handleInputChange('categoria', value)}
                    disabled={!product.produto}
                />
                <SearchableDropdown
                    id={`prod-${product.id}-material`}
                    title={'Material'}
                    placeholder={'Selecione'}
                    value={product.material}
                    options={(product.avaliableMateriais ?? []).map((i) => ({ value: i.id_material, label: i.nome }))}
                    onChange={(value) => handleInputChange('material', value)}
                    disabled={!product.produto}
                />
                <SearchableDropdown
                    id={`prod-${product.id}-tamanho`}
                    title={'Tamanho'}
                    placeholder={''}
                    width={100}
                    value={product.tamanho}
                    options={(product.avaliableTamanhos ?? []).map((tamanho) => ({ value: tamanho, label: tamanho }))}
                    onChange={(value) => handleInputChange('tamanho', value)}
                    disabled={!product.produto}
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
                            <SearchableDropdown
                                id={`adicional-${product.id}-${adicional.id}-item`}
                                title={'Adicional'}
                                placeholder={'Selecione o item adicional'}
                                value={adicional.adicional}
                                onChange={(value) => handleAdicionalInputChange(index, 'adicional', value)}
                            />
                            <InputField
                                id={`adicional-${product.id}-${adicional.id}-valor`}
                                title={'Valor'}
                                placeholder={'R$'}
                                type={'text'}
                                width={25}
                                mask={'currency'}
                                value={adicional.valorAdicional}
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