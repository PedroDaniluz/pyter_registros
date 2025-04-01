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
            <NavBar/>
            <div>
                <button onClick={() => console.log(pedidoInfo)}>a</button>
                <button onClick={() => console.log(pedidoItens)}>b</button>
            </div>
        </main>
    )
}