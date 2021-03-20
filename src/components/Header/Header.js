import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {
                    loggedInUser.email
                    ? <button onClick={()=>setLoggedInUser({})} className="cart-btn">Sign out</button>
                    : <Link to="/login" className="cart-btn">Sign in</Link>
                }

            </nav>
        </div>
    );
};

export default Header;