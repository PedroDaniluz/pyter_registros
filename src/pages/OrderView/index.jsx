import './OrderView.css'
import NavBar from "../../components/NavBar";
import { useParams } from 'react-router-dom';
import { getPedidoInfo, getPedidoItens } from '../../services/Api';
import { useState, useEffect } from 'react';

export default function OrderView() {
    const { id } = useParams();

    const [pedidoInfo, setPedidoInfo] = useState([]);
    const [pedidoItens, setPedidoItens] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pedidoInfoData, pedidoItensData] = await Promise.all([
                    getPedidoInfo(id),
                    getPedidoItens(id)
                ]);
                setPedidoInfo(pedidoInfoData[0]);
                setPedidoItens(pedidoItensData);
            } catch (error) {
                console.error("Erro ao buscar dados iniciais:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <main>
            <NavBar />
            <article className='order-view'>
                <h1>Pedido #{pedidoInfo.id_pedido}</h1>
                <div className='order-view__row'>
                    <section className='order-view__card'>
                        <div className='order-view__card__keys'>
                            <p>Modalidade</p>
                            <p>Situação</p>
                            <p>Data da Nota</p>
                            <p>Prazo de Confecção</p>
                            <p>Previsão de Envio</p>
                            <p>Rastreamento</p>
                            <p>Prazo de Entrega</p>
                        </div>
                        <div className='order-view__card__values'>
                            <p>{pedidoInfo.modalidade}</p>
                            <p>{pedidoInfo.situacao}</p>
                            <p>{pedidoInfo.data}</p>
                            <p>{pedidoInfo.prazo}</p>
                            <p>{pedidoInfo.data_envio !== null ? pedidoInfo.data_envio : '-'}</p>
                            <p>{pedidoInfo.cod_rastreamento !== null ? pedidoInfo.cod_rastreamento : '-'}</p>
                            <p>{pedidoInfo.data_entrega !== null ? pedidoInfo.data_entrega : '-'}</p>
                        </div>
                    </section>

                    <section className='order-view__card'>
                        <div className='order-view__card__keys'>
                            <p>Nome</p>
                            <p>CPF/CNPJ</p>
                            <p>Telefone</p>
                            <p>Email</p>
                            <p>Endereço</p>
                        </div>
                        <div className='order-view__card__values'>
                            <p>{pedidoInfo.nome}</p>
                            <p>{pedidoInfo.cpf}</p>
                            <p>{pedidoInfo.telefone}</p>
                            <p>{pedidoInfo.email !== '' ? pedidoInfo.email : '-'}</p>
                            <p>{pedidoInfo.endereco !== null ? pedidoInfo.endereco : '-'}</p>
                        </div>
                    </section>
                </div>
            </article>
        </main>
    )
}