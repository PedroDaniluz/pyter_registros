import './Register.css'
import NavBar from '../../components/NavBar'
import ClientSection from './sections/ClientSection'
import OrderSection from './sections/OrderSection'
import ProductSection from './sections/ProductSection/index'
import { useState } from 'react'
import { registrarPedidoCompleto } from '../../services/Api'
import PaymentSection from './sections/PaymentSection'

export default function Register() {
    const [paymentData, setPaymentData] = useState();
    const [productData, setProductData] = useState();
    const [orderData, setOrderData] = useState();
    const [clientData, setClientData] = useState();

    const updateData = (type, data) => {
        type === 'client' ? setClientData(data) :
            type === 'order' ? setOrderData(data) :
                type === 'product' ? setProductData(data) :
                    type === 'payment' ? setPaymentData(data) :
                        null;
    }

    let valorTotal = productData?.reduce((acc, product) => {
        return (acc + parseFloat(product.preco));
    }, 0)


    const submit = async (e) => {
        e.preventDefault();

        try {
            const pedidoCompleto = {
                cliente: clientData,
                pedido: {
                    data_pedido: orderData.data,
                    data_prazo: orderData.prazo,
                    id_instituicao: orderData.instituicao,
                    modalidade: "Presencial",
                    id_situacao: 1,
                    observacao: null,
                    valor_total: parseFloat(valorTotal),
                    valor_pago: parseFloat(paymentData.valor_pago.replace(/[^\d,.-]/g, "").replace(",", ".")),
                },
                itens: productData.map(prod => {
                    const adicionaisConvertidos = prod.adicionais.map(adicional => {
                        const { id, ...adicionalSemId } = adicional;
                        return {
                            ...adicionalSemId,
                            valorAdicional: parseFloat(
                                adicional.valorAdicional
                                    .replace(/[^\d,.-]/g, "")
                                    .replace(",", ".")
                            )
                        };
                    });
                    return {
                        id_variacao: prod.id_variacao,
                        quantidade: prod.quantidade,
                        adicionais: adicionaisConvertidos,
                        descontos: null,
                        preco_unitario_base: parseFloat(prod.preco_base)
                    };
                }),

                pagamento: {
                    meio_pagamento: paymentData.meio_pg,
                    forma_pagamento: paymentData.forma_pg,
                    valor: parseFloat(paymentData.valor_pago.replace(/[^\d,.-]/g, "").replace(",", ".")),
                    cod_autorizacao: paymentData.cod_aut || null
                }
            };

            const response = await registrarPedidoCompleto(pedidoCompleto);
            console.log("Pedido registrado com sucesso:", response);
            console.log(pedidoCompleto)
            alert("Pedido salvo com sucesso!");

        } catch (error) {
            console.log("Erro ao salvar o pedido:", error);
            alert("Erro ao salvar o pedido. Veja o console para mais detalhes.");
        }
    };


    return (
        <main>
            <NavBar />
            <form onSubmit={submit} className='register'>
                <h1>Registrar Pedido</h1>
                <ClientSection
                    updateData={(value) => updateData('client', value)}
                />
                <OrderSection
                    updateData={(value) => updateData('order', value)}
                />
                <ProductSection
                    updateData={(value) => updateData('product', value)}
                />
                <PaymentSection
                    updateData={(value) => updateData('payment', value)}
                    total={valorTotal}
                />
                <button type='submit'>salvar</button>
            </form>
        </main>
    )
}