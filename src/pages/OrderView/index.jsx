import './OrderView.css'
import NavBar from "../../components/NavBar";
import { useParams } from 'react-router-dom';
import { getPedidoInfo, getPedidoItens, getPedidoPagamentos } from '../../services/Api';
import { useState, useEffect } from 'react';

export default function OrderView() {
    const { id } = useParams();

    const [pedidoInfo, setPedidoInfo] = useState([]);
    const [pedidoItens, setPedidoItens] = useState([]);
    const [pedidoPagamentos, setPedidoPagamentos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pedidoInfoData, pedidoItensData, pedidoPagamentosData] = await Promise.all([
                    getPedidoInfo(id),
                    getPedidoItens(id),
                    getPedidoPagamentos(id)
                ]);
                setPedidoInfo(pedidoInfoData[0]);
                setPedidoItens(pedidoItensData);
                setPedidoPagamentos(pedidoPagamentosData);
            } catch (error) {
                console.error("Erro ao buscar dados iniciais:", error);
            }
        };
        fetchData();
    }, []);

    function toBRL(number) {
        return Number(number).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    function toDateBR(date) {
        return new Date(date).toLocaleDateString('pt-BR');
    }

    const valorTotal = toBRL(pedidoItens.reduce((total, item) => total + item.valor_total, 0));
    const valorPago = toBRL(pedidoPagamentos.reduce((total, pag) => total + parseFloat(pag.valor), 0));

    return (
        <main>
            <NavBar />
            <article className='order-view'>
                <h1>Pedido #{pedidoInfo.id_pedido}</h1>
                <div className='order-view__row'>
                    <section className='order-view__card'>
                        {[
                            ['Modalidade', pedidoInfo.modalidade],
                            ['Situação', pedidoInfo.situacao],
                            ['Data da Nota', pedidoInfo.data],
                            ['Prazo de Confecção', pedidoInfo.prazo],
                            ['Previsão de Envio', pedidoInfo.data_envio ?? '-'],
                            ['Rastreamento', pedidoInfo.cod_rastreamento ?? '-'],
                            ['Prazo de Entrega', pedidoInfo.data_entrega ?? '-'],
                        ].map(([label, value], index) => (
                            <div key={index} className='order-view__card__row'>
                                <p className='order-view__key'>{label}</p>
                                <p>{value}</p>
                            </div>
                        ))}
                    </section>
                    <section className='order-view__card' style={{ alignSelf: 'auto' }}>
                        {[
                            ['Nome', pedidoInfo.nome],
                            ['CPF/CNPJ', pedidoInfo.cpf],
                            ['Telefone', pedidoInfo.telefone],
                            ['Email', pedidoInfo.email !== null ? pedidoInfo.email : '-'],
                            ['Endereço', pedidoInfo.endereco !== null ? pedidoInfo.endereco : '-'],
                        ].map(([label, value], index) => (
                            <div key={index} className='order-view__card__row'>
                                <p className='order-view__key'>{label}</p>
                                <p>{value}</p>
                            </div>
                        ))}
                    </section>
                </div>
                <div className='order-view__row'>
                    <section className='order-view__card'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Qnt</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidoItens.map((item, index) =>
                                    <tr key={index}>
                                        <td>
                                            <p className='order-item'>• {item.produto} {item.categoria} - {(item.tamanho).replace('-', ' ')}</p>
                                            <p className='order-item__description'>Produto Base (unidade)</p>
                                            {(item.adicionais).map((adicional, index) =>
                                                <p className='order-item__description' key={index}>{adicional.adicional}</p>
                                            )}
                                            <p className='order-item__description'>{item.observacao}</p>
                                        </td>
                                        <td className='order-item'>{item.quantidade}</td>
                                        <td>
                                            <p className='order-item'>{toBRL(item.valor_total)}</p>
                                            <p className='order-item__description'>{toBRL(item.preco_unitario_base)}</p>
                                            {(item.adicionais).map((adicional, index) =>
                                                <p className='order-item__description' key={index}>+{toBRL(adicional.valorAdicional)}</p>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                    <div className='order-view__column'>
                        <section className='order-view__card'>
                            <h2>Total</h2>
                            <div className='order-view__price-overview'>
                                <strong>Produtos</strong>
                                <p>{valorTotal}</p>
                            </div>
                            <p className='total-highlight'>{valorTotal}</p>
                        </section>

                        <section className='order-view__card'>
                            <h2>Pagamentos</h2>
                            {pedidoPagamentos.map((pag, index) =>
                                <div key={index} className='order-view__price-overview'>
                                    <div>
                                        <strong>{pag.parcelas != 1? `${pag.forma_pagamento} em ${pag.parcelas}x`: pag.forma_pagamento}</strong>
                                        <p className='payment-details'>{toDateBR(pag.data_pagamento)}</p>
                                        <p className='payment-details'>{pag.cod_autorizacao? '#' + pag.cod_autorizacao: ''}</p>
                                    </div>
                                    <p>{toBRL(pag.valor)}</p>
                                </div>
                            )}
                            <p className='total-highlight'>{valorPago}</p>

                        </section>
                    </div>
                </div>
                <button onClick={() => console.log(pedidoPagamentos)}>a</button>
            </article>
        </main>
    )
}