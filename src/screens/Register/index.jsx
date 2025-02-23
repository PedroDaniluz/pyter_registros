import './Register.css'
import NavBar from '../../components/NavBar'
import InputField from '../../components/InputField'

export default function Register() {
    return (
        <main>
            <NavBar/>
            <section className='register'>
                <h1>Registrar Pedido</h1>
                <div className='squareDiv'>
                    <InputField/>
                </div>
            </section>
        </main>
    )
}