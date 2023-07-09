import React from "react";
import styles from './Drawer.module.scss'
import Info from './../Info/index'
import AppContext from "./../../Context";
import axios from "axios";

const delay = () => new Promise((resolve) => setTimeout(resolve, 200))
const Drawer = ({Count, onRemove,onClickClose, items = [], oppened = false}) => {
    const [idLoading, setIsLoading] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const {setCartItems, cartItems} = React.useContext(AppContext)
    const [isComplete, setIsComplete] = React.useState(false)
    const onClickOrder = async () => {
        try{
            setIsLoading(true)
            const {data} = await axios.post('https://64a412e5c3b509573b570399.mockapi.io/orders', {items: cartItems});
            for (let i = 0; i < cartItems.length; i++){
                const item = cartItems[i]
                await axios.delete(`https://64a01998ed3c41bdd7a6ff00.mockapi.io/Cart/${item.id}`);
                await delay()
            }
            setOrderId(data.id)
            setIsComplete(true)
            setCartItems([])
        }
        catch (error){
            alert('Ошибка при создании заказа')
        }
        setIsLoading(false)
    }
    return(
        <div className={`${styles.overlay} ${oppened ? styles.hidden : null}`}>
            {items.length < 1 ?
                <aside className={styles.drawer}>
                    <div className={styles.emptyCart}>
                        <div className={styles.empty}>
                            <Info
                                imgHeight={120}
                                imgWidth={isComplete ? 83 : 120}
                                setIsComplete={setIsComplete}
                                onClickClose={onClickClose}
                                title={isComplete ? 'Заказ оформлен!' : "Корзина пустая"}
                                 description={isComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                                 imageUrl={isComplete ? '/img/complete-offer.jpg' : '/img/emptyCart.jpg'}
                            />
                        </div>
                    </div>
                </aside> :
                <aside className={styles.drawer}>
                    <h3 className="mb-30 d-flex justify-between">Корзина
                        <img onClick={onClickClose} className="cu-p" src="/img/btn-premove.svg" alt="remove"/>
                    </h3>
                    <div className={styles.items}>
                        {items.map((obj) =>(
                            <div key={obj.id} className={styles.cartList}>
                                <div className={styles.cartItemImg} style={{backgroundImage: `url(${obj.imageUrl})`}}></div>
                                <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img onClick={() => onRemove(obj.id)} className="cu-p" src="/img/btn-premove.svg" alt="remove"/>
                            </div>
                        ))}
                    </div>
                    <div>
                        <ul className={styles.cartTotalBlock}>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{Count} руб.</b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{Count * 5/100} руб.</b>
                            </li>
                        </ul>
                        <button disabled={idLoading} onClick={onClickOrder} className={styles.greenBtn}>Оформить заказ
                            <img src="/img/arrow.svg" alt="arrow"/>
                        </button>
                    </div>
                </aside>
            }
        </div>
    )
}

export default Drawer