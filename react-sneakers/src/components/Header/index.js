import React from "react";
import {Link} from "react-router-dom";
import styles from './Header.module.scss'

function Header(props){
    return (
        <header className={styles.header}>
            <Link to="/">
                <div className="header-left  d-flex align-center">
                        <img className={styles.logo} width={40} height={40} src="/img/logo.png" alt="logo"/>

                    <div className="header-info">
                        <h3>REACT SNEAKERS</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>

                </div>
            </Link>
            <ul className="header-right d-flex">
                <li className="mr-30 cu-p" onClick={props.onClickCart}>
                    <img className="mr-10" width={20} height={20} src="/img/card.svg" alt="cart"/>
                    <span>{props.Count} руб.</span>
                </li>
                <li className="mr-30 cu-p">
                    <Link to="/favorite">
                        <img onClick={props.onFavoriteClick} width={20} height={20} src="/img/fovarite.png" alt="favorite"/>
                    </Link>

                </li>
                <li>
                    <Link to="/orders">
                        <img width={20} height={20} src="/img/user.svg" alt="user"/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}
export default Header