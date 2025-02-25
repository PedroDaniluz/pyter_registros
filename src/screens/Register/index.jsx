import './Register.css'
import NavBar from '../../components/NavBar'
import InputField from '../../components/InputField'
import SearchableDropdown from '../../components/DropDown'
import SwitchButton from '../../components/SwitchButton'

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
                            <InputField title='Telefone' placeholder='Insira o telefone do cliente' id={'tel'} type={'text'} mask={'(99) 99999-9999'} width={80}/>
                            <InputField title='Nome' placeholder='Insira o nome do cliente' id={'nome'} type={'text'}/>
                            <InputField title='Email (opcional)' placeholder='Insira o email do cliente' id={'email'} type={'email'}/>
                        </div>
                    </div>
                    <div className='stdIn'>
                        <h2>Pedido</h2>
                        <div className='stdIn--inputs'>
                            <InputField title='Data' placeholder='Insira o nome do cliente' id={'data'} type={'date'} width={50}/>
                            <InputField title='Prazo (opcional)' placeholder='Insira o telefone do cliente' id={'tel'} type={'date'} width={50}/>
                            <SearchableDropdown title={'Instituição'} placeholder={'Selecione a instituição'}/>
                        </div>
                    </div>
                    <div className='stdIn'>
                        <h2>Produtos</h2>
                        <div className='stdIn--inputs'>
                            <SearchableDropdown title={'Produto'} placeholder={'Selecione'}/>
                            <SearchableDropdown title={'Categoria'} placeholder={'Selecione'}/>
                            <SearchableDropdown title={'Material'} placeholder={'Selecione'}/>
                            <InputField title='Quantidade' id={'qnt'} type={'number'} width={10} defaultValue={1}/>
                            <SearchableDropdown title={'Tamanho'} placeholder={''} width={50}/>
                            <InputField title='Preço' placeholder='R$' id={'preco'} type={'text'} width={10} mask={'currency'}/>
                        </div>
                        <div className='stdIn--inputs'>
                            <InputField title='Observações (opcional)' placeholder='Insira os detalhes específicos do produto' id={'obs'} type={'text'}/>
                            <SwitchButton title={'Adicionais'} placeholder={'Adicionais pagos'} width={25}/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}