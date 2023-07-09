import React from "react";
import styles from './Card.module.scss'
import AppContext from "./../../Context";

function Card({onFavorite, title,price, imageUrl, onPlus, favorite= false, id, added= false, hideBtn= false, parentId}) {
    const {isItemAdded, isFavoriteAdded} = React.useContext(AppContext)
    const [isFollow, setIsFollow] = React.useState(favorite)
    const obj = {id, parentId: id ,  title, price, imageUrl}

    const onClickPlus = () =>{
        onPlus(obj)
    }
    const onClickFollow = () => {
        onFavorite(obj)
    }
    return (
        <div className={styles.card}>
            {hideBtn ? null :
                <div className={styles.favorite} onClick={onClickFollow}>
                        <img src={isFavoriteAdded(id) ||  isFollow? "/img/heartLiked.svg" :  "/img/heartUnLiked.svg "} alt="Unliked"/>
                    </div>}
                    <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                          <span>
                              Цена:
                          </span>
                            <b>{price} руб.</b>
                        </div>
                        {hideBtn ? null :
                        <img onClick={onClickPlus} className={styles.btn} src={isItemAdded(id) ? '/img/btn-cheaked.svg ' : '/img/btnPlus.svg'} alt="plus"/>}
                </div>
        </div>


    )
}
export default Card