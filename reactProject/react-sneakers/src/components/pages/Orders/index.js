import axios from "axios";
import React, {useContext} from "react";
import style from './Orders.module.scss'
import Card from "./../../Card/index";
import AppContext from "./../../../Context";
import Info from './../../Info/index'
export const Orders = () => {
    const {onClickFavorite, onAddToCart} = useContext(AppContext)
    const [orderItems, setOrderItems] = React.useState([])
    React.useEffect(   () => {
        async function fatchData() {
            try {
                const {data} = await axios.get('https://64a412e5c3b509573b570399.mockapi.io/orders')
                setOrderItems(data)
            }
            catch (error){
                alert('Ошибка при получении заказов')
            }
        }
        fatchData()
    }, [])
    return (

        <section className={`${style.content} ${orderItems.length > 0 ? null : style.emptyOrderContent}`}>
            {orderItems.length > 0 ?
            <>
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Мои Заказы</h1>
                </div>
                <div className="d-flex flex-wrap">
                    {orderItems.reduce((prev, obj) => [...prev, ...obj.items], []).map((item, index) => <Card
                        key={index}
                        onPlus={(obj) => onAddToCart(obj)}
                        onFavorite={(obj)  => onClickFavorite(obj)}
                        hideBtn={true}
                        {...item}
                    />)}
                </div>
            </> :
            <div>
                <div className={style.OrderInfo}>
                    <Info
                        imgHeight={70}
                        imgWidth={70}
                        title={'У вас нет заказов'}
                        description={'Оформите хотя бы один заказ.'}
                        imageUrl={'/img/sad-smile-order.png'}
                        backHome={true}
                    />
                </div>
            </div>
            }
        </section>
    )
}