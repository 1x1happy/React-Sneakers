import React, {useContext} from "react";
import styles from './Favorite.module.scss'
import Card from "./../../Card/index";
import AppContext from "./../../../Context";
import Info from "./../../Info/index";



const Favorite = ({items, onClickFavorite}) => {
    const {onAddToCart} = useContext(AppContext)
    return (
        items.length > 0 ?
            <section className={styles.content}>
                <h1>Мои закладки</h1>
                <div className="d-flex flex-wrap">
                    {items.map((obj, index) => (
                        <Card
                            key={index}
                            favorite={true}
                            onPlus={(obj) => onAddToCart(obj)}
                            onFavorite={(obj) => onClickFavorite(obj)}
                            {...obj}
                        />
                    ))}
                </div>
            </section> :
            <section className={styles.emptyContent}>
                <div className={styles.favoriteContent}>
                    <Info
                        imgHeight={70}
                        imgWidth={70}
                        title={'Закладок нет :('}
                        description={'Вы ничего не добавили в закладки'}
                        imageUrl={'/img/sad-smile.png'}
                        backHome={true}
                    />
                </div>
            </section>
    )}

export default Favorite