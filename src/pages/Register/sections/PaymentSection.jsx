import { useState, useEffect, useMemo, useId } from 'react';
import SearchableDropdown from '../../../components/DropDown'; // supondo que seja um componente separado

const pagamento_options = {
    'CAIXA': [{ 'DINHEIRO': 1 }, { 'PIX': 1 }],
    'PICPAY': [{ 'CRÉDITO': 3 }, { 'DÉBITO': 1 }, { 'PIX': 1 }],
    'SUMUP': [{ 'CRÉDITO': 3 }, { 'DÉBITO': 1 }, { 'PIX': 1 }]
};

export default function PaymentSection({ updateData }) {
    const [paymentData, setPaymentData] = useState({
        meio_pg: '',
        forma_pg: '',
        parcelas: 1,
        desconto: 0,
        valor_final: 0,
        valor_pago: 0,
        cod_aut: '',
        observacoes: ''
    });

    const handleChange = (key, value) => {
        setPaymentData(prevState => ({
            ...prevState,
            [key]: value,
            ...(key === 'meio_pg' ? { forma_pg: '', parcelas: 1 } : {}),
            ...(key === 'forma_pg' ? { parcelas: 1 } : {})
        }));
    };

    useEffect(() => {
        updateData(paymentData);
    }, [paymentData]);

    const meiosPagamento = useMemo(() =>
        Object.keys(pagamento_options).map(meio => ({ label: meio, value: meio }))
    , []);

    const formasPagamento = useMemo(() => {
        const selected = pagamento_options[paymentData.meio_pg];
        if (!selected) return [];
        return selected.map(item => {
            const forma = Object.keys(item)[0];
            return { label: forma, value: forma };
        });
    }, [paymentData.meio_pg]);

    const parcelasOptions = useMemo(() => {
        const formas = pagamento_options[paymentData.meio_pg];
        if (!formas) return [];
        const formaObj = formas.find(f => Object.keys(f)[0] === paymentData.forma_pg);
        if (!formaObj) return [];
        const max = formaObj[paymentData.forma_pg];
        return Array.from({ length: max }, (_, i) => {
            const num = i + 1;
            return { label: `${num}x`, value: num };
        });
    }, [paymentData.meio_pg, paymentData.forma_pg]);


    return (
        <section className='stdIn'>
            <h2>Pagamento</h2>
            <div className='stdIn--inputs'>
                <SearchableDropdown
                    id={useId()}
                    options={meiosPagamento}
                    title={'Meio de Pagamento'}
                    placeholder={'Selecione'}
                    value={paymentData.meio_pg}
                    onChange={(option) => handleChange('meio_pg', option)}
                />
                <SearchableDropdown
                    id={useId()}
                    options={formasPagamento}
                    title={'Forma de Pagamento'}
                    placeholder={'Selecione'}
                    value={paymentData.forma_pg}
                    onChange={(option) => handleChange('forma_pg', option)}
                />
                <SearchableDropdown
                    id={useId()}
                    options={parcelasOptions}
                    title={'Parcelas'}
                    placeholder={'Selecione'}
                    value={paymentData.parcelas}
                    onChange={(option) => handleChange('parcelas', Number(option))}
                />
            </div>
        </section>
    );
}
