import './Register.css'
import NavBar from '../../components/NavBar'
import InputField from '../../components/InputField'
import SearchableDropdown from '../../components/DropDown'

export default function Register() {
    return (
        <main>
            <NavBar/>
            <section className='register'>
                <h1>Registrar Pedido</h1>
                <div className='rsquareDiv'>
                    <div className='stdIn'>
                        <h2>Clientes</h2>
                        <div className='stdIn--inputs'>
                            <InputField title='Telefone' placeholder='Insira o telefone do cliente' id={'tel'} type={'text'} telMask={true} width={80}/>
                            <InputField title='Nome' placeholder='Insira o nome do cliente' id={'nome'} type={'text'}/>
                            <InputField title='Email (opcional)' placeholder='Insira o email do cliente' id={'email'} type={'email'}/>
                        </div>
                    </div>
                    <div className='stdIn'>
                        <h2>Pedido</h2>
                        <div className='stdIn--inputs'>
                            <InputField title='Data' placeholder='Insira o nome do cliente' id={'nome'} type={'date'} className='inputSmall' width={50}/>
                            <InputField title='Prazo (opcional)' placeholder='Insira o telefone do cliente' id={'tel'} type={'date'} width={50}/>
                            <SearchableDropdown title={'Instituição'} placeholder={'Selecione a instituição'}/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}