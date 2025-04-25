import { Link } from 'react-router-dom';
import './NavBar.css'

import logo from '/src/assets/images/pyterLogo.svg'
import { RiHome2Fill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiAddCircleFill } from "react-icons/ri";
import { RiStore2Fill } from "react-icons/ri";

export default function NavBar() {
    return (
        <nav className="navBar">
            <img src={ logo } alt="" className="logo"/>
            <ul>
                <li> 
                    <Link to={'/'} className='navLink'>
                        <RiHome2Fill className='navIcon'/>
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/order-list'} className='navLink'>
                        <RiShoppingCart2Fill className='navIcon'/>
                        <span>Pedidos</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/register'} className='navLink'>
                        <RiAddCircleFill className='navIcon'/>
                        <span>Registrar Pedido</span>
                    </Link>
                </li>
                <li>
                    <Link to={'/product-manager'} className='navLink' style={{alignItems: 'start'}}>
                        <RiStore2Fill className='navIcon'/>
                        <span>Gerenciar Produtos</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}