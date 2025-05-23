import { useState, useEffect, useMemo, useId } from 'react';
import SearchableDropdown from '../../../components/DropDown';
import InputField from '../../../components/InputField';
import PriceBox from '../../../components/PriceBox';

const pagamento_options = {
    Caixa: {
        Dinheiro: 1,
        PIX: 1
    },
    PicPay: {
        Crédito: 3,
        Débito: 1,
        PIX: 1
    },
    Sumup: {
        Crédito: 3,
        Débito: 1,
        PIX: 1
    }
};


export default function PaymentSection({ updateData, total }) {
    const [paymentData, setPaymentData] = useState({
        meio_pg: null,
        forma_pg: null,
        parcelas: 1,
        desconto: null,
        valor_final: null,
        valor_pago: null,
        cod_aut: null,
        observacoes: null
    });

    const handleChange = (key, value) => {
        setPaymentData(prevState => ({
            ...prevState,
            [key]: value,
            ...(key === 'meio_pg' ? {
                forma_pg: null,
                parcelas: 1,
                cod_aut: null
            } : {}),
            ...(key === 'forma_pg' ? { parcelas: 1 } : {})
        }));
    };

    useEffect(() => {
        setPaymentData(prev => ({
            ...prev,
            valor_final: total? Number(total).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : 'R$ 0,00',
            valor_pago: total? Number(total).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : 'R$ 0,00'
        }));
    }, [total]);

    useEffect(() => {
        updateData(paymentData);
    }, [paymentData]);

    const meiosPagamento = useMemo(() =>
        Object.keys(pagamento_options).map(meio => ({ label: meio, value: meio }))
        , []);

    const formasPagamento = useMemo(() => {
        if (!paymentData.meio_pg) return [];
        return Object.keys(pagamento_options[paymentData.meio_pg])
            .map(forma => ({ label: forma, value: forma }));
    }, [paymentData.meio_pg]);

    const parcelasOptions = useMemo(() => {
        const max = pagamento_options?.[paymentData.meio_pg]?.[paymentData.forma_pg];
        if (!max) return [];
        return Array.from({ length: max }, (_, i) => ({
            label: `${i + 1}x`,
            value: i + 1
        }));
    }, [paymentData.meio_pg, paymentData.forma_pg]);


    return (
        <section className='inputCard'>
            <h2>Pagamento</h2>
            <div className='inputCard--fields'>
                <SearchableDropdown
                    id={useId()}
                    options={meiosPagamento}
                    title={'Meio de Pagamento'}
                    placeholder={'Selecione'}
                    value={paymentData.meio_pg}
                    onChange={(value) => handleChange('meio_pg', value)}
                />
                <SearchableDropdown
                    id={useId()}
                    options={formasPagamento}
                    title={'Forma de Pagamento'}
                    placeholder={'Selecione'}
                    value={paymentData.forma_pg}
                    onChange={(value) => handleChange('forma_pg', value)}
                    disabled={!paymentData.meio_pg}
                />
                <SearchableDropdown
                    id={useId()}
                    options={parcelasOptions}
                    title={'Parcelas'}
                    placeholder={'Selecione'}
                    value={paymentData.parcelas}
                    onChange={(value) => handleChange('parcelas', Number(value))}
                    disabled={!paymentData.forma_pg}
                />
                <PriceBox
                    id={useId()}
                    title={'Valor Total'}
                    value={total}
                    width={12}
                />
            </div>
            <div className='inputCard--fields'>
                <InputField
                    id={useId()}
                    title={'Valor Pago'}
                    type={'text'}
                    mask={'currency'}
                    width={20}
                    value={paymentData.valor_pago}
                    defaultValue={paymentData.valor_final}
                    onChange={(value) => handleChange('valor_pago', value)}
                    disabled={!paymentData.forma_pg}
                />
                <InputField
                    id={useId()}
                    title={'Codigo de Autorização (Maquininhas)'}
                    placeholder={'Insira o código de autorização de venda'}
                    type={'text'}
                    required={paymentData.meio_pg !== 'Caixa'}
                    value={paymentData.cod_aut}
                    onChange={(value) => handleChange('cod_aut', value)}
                    disabled={paymentData.meio_pg === 'Caixa' || paymentData.valor_pago === 'R$ 0,00'}
                />
                <InputField
                    id={useId()}
                    title={'Observações (Opcional)'}
                    placeholder={'Insira as observações de pagamento'}
                    type={'text'}
                    required={false}
                    value={paymentData.observacoes}
                    onChange={(value) => handleChange('observacoes', value)}
                    disabled={!paymentData.forma_pg}                    
                />
            </div>
        </section>
    );
}
