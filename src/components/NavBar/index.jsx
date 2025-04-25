import { Link } from 'react-router-dom';
import './NavBar.css'

import logo from '/src/assets/images/pyterLogo.svg'
import homeIcon from '/src/assets/images/icons/darkVariants/home.svg'
import cartIcon from '/src/assets/images/icons/darkVariants/cart.svg'
import addIcon from '/src/assets/images/icons/darkVariants/add.svg'
import storeIcon from '/src/assets/images/icons/darkVariants/store.svg'

export default function NavBar() {
    return (
        <nav className="navBar">
            <img src={ logo } alt="" className="logo"/>
            <ul>
                <li>
                    <Link to={'/'}>
                        <img src={ homeIcon } alt="Ícone de casa"/>
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/order-list'}>
                        <img src={ cartIcon } alt="Ícone de carrinho"/>
                        <span>Pedidos</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/register'}>
                        <img src={ addIcon } alt="Ícone de adição"/>
                        <span>Registrar Pedido</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/product-manager'}>
                        <img src={ storeIcon } alt="Ícone de loja"/>
                        <span>Gerenciar Produtos</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}