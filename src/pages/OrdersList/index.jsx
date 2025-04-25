import './OrderList.css';
import NavBar from "../../components/NavBar";
import { getPedidos } from '../../services/Api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function OrderList() {
    const [listaPedidos, setListaPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchListaPedidos = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 100)); // Simula um atraso de 100ms - teste de loading
                const data = await getPedidos();
                setListaPedidos(data);
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchListaPedidos();
    }, []);

    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/order/${id}`);
    };

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = listaPedidos.slice(firstItemIndex, lastItemIndex);

    const nextPage = () => {
        if (lastItemIndex < listaPedidos.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <main>
            <NavBar />
            <div className='orderList'>
                <h1>Lista de Pedidos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>SITUAÇÃO</th>
                            <th>CLIENTE</th>
                            <th>DATA</th>
                            <th>PRAZO</th>
                            <th>INSTITUIÇÃO</th>
                            <th>VALOR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: itemsPerPage }).map((_, index) => (
                                <tr key={index}>
                                    <td><Skeleton width={40} /></td>
                                    <td><Skeleton width={80} /></td>
                                    <td><Skeleton width={120} /></td>
                                    <td><Skeleton width={90} /></td>
                                    <td><Skeleton width={90} /></td>
                                    <td><Skeleton width={130} /></td>
                                    <td><Skeleton width={70} /></td>
                                </tr>
                            ))
                        ) : (
                            currentItems.map(p => (
                                <tr key={p.id_pedido} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(p.id_pedido)}>
                                    <td>{p.id_pedido}</td>
                                    <td>{p.situacao}</td>
                                    <td>{p.cliente}</td>
                                    <td>{String(p.data).split('-').reverse().join("/")}</td>
                                    <td>{String(p.prazo).split('-').reverse().join("/")}</td>
                                    <td>{p.instituicao || '-'}</td>
                                    <td>R$ {String(parseFloat(p.valor_total).toFixed(2)).replace('.', ',')}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {!loading && (
                    <div className='pagination'>
                        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                        <span>Página {currentPage}</span>
                        <button onClick={nextPage} disabled={lastItemIndex >= listaPedidos.length}>Próxima</button>
                    </div>
                )}
            </div>
        </main>
    );
}
