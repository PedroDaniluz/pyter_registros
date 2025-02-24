import './Register.css'
import NavBar from '../../components/NavBar'
import InputField from '../../components/InputField'

export default function Register() {
    return (
        <main>
            <NavBar/>
            <section className='register'>
                <h1>Registrar Pedido</h1>
                <div className='rsquareDiv'>
                    <div className='pedidos'>
                        <h2>Clientes</h2>
                        <div className='pedidos-input'>
                            <InputField title='Nome' placeholder='Insira o nome do cliente' id={'nome'} type={'text'}/>
                            <InputField title='Telefone' placeholder='Insira o telefone do cliente' id={'tel'} type={'text'}/>
                            <InputField title='Email (opcional)' placeholder='Insira o email do cliente' id={'email'} type={'email'}/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}