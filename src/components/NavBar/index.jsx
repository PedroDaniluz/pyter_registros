import { Link } from 'react-router-dom';
import './NavBar.css'

export default function NavBar() {
    return (
        <nav className="navBar">
            <img src="/src/assets/images/pyterLogo.svg" alt="" className="logo"/>
            <ul>
                <li>
                    <Link to={'/'}>
                        <img src="/src/assets/images/icons/darkVariants/home.svg" alt="Ícone de casa"/>
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to={''}>
                        <img src="/src/assets/images/icons/darkVariants/cart.svg" alt="Ícone de carrinho"/>
                        <span>Pedidos</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/register'}>
                        <img src="/src/assets/images/icons/darkVariants/add.svg" alt="Ícone de adição"/>
                        <span>Registrar Pedido</span>
                    </Link>
                </li>
                <li>
                    <Link to={''}>
                        <img src="/src/assets/images/icons/darkVariants/store.svg" alt="Ícone de loja"/>
                        <span>Gerenciar Produtos</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}