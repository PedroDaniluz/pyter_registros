import './Register.css'
import NavBar from '../../components/NavBar'
import ClientSection from './sections/ClientSection'
import OrderSection from './sections/OrderSection'
import ProductSection from './sections/ProductSection/index'
import { useState } from 'react'

export default function Register() {
    const [productData, setProductData] = useState();
    const [orderData, setOrderData] = useState();
    const [clientData, setClientData] = useState();

    const updateData = (type, data) => {
        type === 'client'? setClientData(data) :
        type === 'order'? setOrderData(data) :
        type === 'product'? setProductData(data) :
        null;
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(clientData);
        console.log(orderData);
        const relevantProductData = productData.map(product => {
            return {
                produto: product.produto,
                categoria: product.categoria,
                material: product.material,
                quantidade: product.quantidade,
                tamanho: product.tamanho,
                preco: product.preco,
                observacoes: product.observacoes,
                adicionais: product.adicionais.map(add => {return{adiconal: add.adicional, valor: add.valorAdicional}})
            };
        });
        console.log(relevantProductData);
    }

    return (
        <main>
            <NavBar/>
            <form onSubmit={submit} className='register'>
                <h1>Registrar Pedido</h1>
                <div className='rsquareDiv'>
                    <ClientSection
                        updateData = {(value) => updateData('client', value)}
                    />
                    <OrderSection
                        updateData = {(value) => updateData('order', value)}
                    />
                    <ProductSection
                        updateData = {(value) => updateData('product', value)}
                    />
                </div>
                <button type='submit'>salvar</button>
            </form>
        </main>
    )
}