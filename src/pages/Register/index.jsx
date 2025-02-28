import './Register.css'
import NavBar from '../../components/NavBar'
import ClientSection from './sections/ClientSection'
import OrderSection from './sections/OrderSection'
import ProductSection from './sections/ProductSection'

export default function Register() {
    return (
        <main>
            <NavBar/>
            <section className='register'>
                <h1>Registrar Pedido</h1>
                <div className='rsquareDiv'>
                    <ClientSection/>
                    <OrderSection/>
                    <ProductSection/>
                </div>
            </section>
        </main>
    )
}