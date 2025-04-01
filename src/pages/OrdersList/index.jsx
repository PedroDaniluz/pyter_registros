import './OrderList.css'
import NavBar from "../../components/NavBar";
import { getPedidos } from '../../services/Api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderList() {
    const [listaPedidos, setListaPedidos] = useState([]);
    
        useEffect(() => {
            const fetchListaPedidos = async () => {
                const data = await getPedidos();
                setListaPedidos(data);
            };
            fetchListaPedidos();
        }, []);

        const navigate = useNavigate();

        const handleRowClick = (id) => {
            navigate(`/pedidos/${id}`);
        }
    
    return (
        <main>
            <NavBar/>
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
                        {listaPedidos.map(p =>
                            <tr key={p.id_pedido} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(p.id_pedido)}>
                                <td>{p.id_pedido}</td>
                                <td>{p.situacao}</td>
                                <td>{p.cliente}</td>
                                <td>{String(p.data).split('-').reverse().join("/")}</td>
                                <td>{String(p.prazo).split('-').reverse().join("/")}</td>
                                <td>{p.instituicao}</td>
                                <td>R$ {String(p.valor).replace('.', ',')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
}