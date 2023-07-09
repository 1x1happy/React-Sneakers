import Card from "./../../Card/index";
import styles from "./Home.module.scss"
import React from "react";
import Loading from "./../../Loading/index";


const Home = ({items, searchValue, onAddToCart, onChangeSearchInput, onClickFavorite, cartItems, loading = false }) => {
    let limit = [...Array(10)]

    return (
        <section className={styles.content}>
            <div className="d-flex justify-between align-center mb-40">
                <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}</h1>
                <div className={styles.searchBlock}>
                    <img src="/img/search.svg" alt="search"/>
                    <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск...." type="text" maxLength={20}/>
                </div>
            </div>
            <div className={styles.cardList}>
                {loading === false ?
                 limit.map((obj, index) => <Loading key={index}/>) :
                items.filter((item) =>(item.title.toLowerCase().includes(searchValue.toLowerCase()))).map((item, index) =>(<Card
                    key={index}
                    onPlus={(obj) => onAddToCart(obj)}
                    onFavorite={(obj)  => onClickFavorite(obj)}
                    {...item}
                /> ))}
            </div>
        </section>
    )
}
export default Home