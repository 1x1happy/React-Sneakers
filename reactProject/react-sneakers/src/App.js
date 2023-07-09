import React from "react";
import axios from "axios";
import {Route} from "react-router-dom";
import Header from "./components/Header/index";
import Drawer from "./components/Drawer/index"
import Favorite from "./components/pages/Favorite/index"
import Slider from './components/Slider/index'
import Home from "./components/pages/Home";
import {Orders} from "./components/pages/Orders/index";
import AppContext from "./Context";
import favorite from "./components/pages/Favorite/index";

function App() {

    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [FavoriteItems, setFavoriteItems] = React.useState([])
    const [searchValue, setSearchValue] = React.useState("")
    const [cartOpened, setCartOpened] = React.useState(false)
    const [isFavorite, setIsFavorite] = React.useState(false)
    const [isReady, setIsReady] = React.useState(false)
    React.useEffect(() => {
        axios.get('https://64a01998ed3c41bdd7a6ff00.mockapi.io/Cart').then(res => {
            setCartItems(res.data)
        }).then(() => {
            axios.get('https://64a412e5c3b509573b570399.mockapi.io/follow').then(res => {
                setIsFavorite(res.data)
                setFavoriteItems(res.data)
            }).then(() => {
                axios.get('https://64a01998ed3c41bdd7a6ff00.mockapi.io/items').then(res => {
                setItems(res.data)
                }).then(() => {
                    setIsReady(true)
                })
            })
        })
    }, [])

    const OpenFavorite = async () => {
            try{
                await axios.get('https://64a412e5c3b509573b570399.mockapi.io/follow').then(res =>{
                    setFavoriteItems(res.data)
                })
            }
            catch (error){
                alert('Не удалось получить данные закладок')
            }
    }
    const onRemoveToCart = async (id) => {
        try {
            setCartItems((prev) => prev.filter((item) => item.id !== id))
            await  axios.delete(`https://64a01998ed3c41bdd7a6ff00.mockapi.io/Cart/${id}`)
        }
        catch (error){
            alert('Ошибка при удалении из корзины')
        }
    }
    const onAddToCart = (obj)=>{
        try{
            const findPath = async (obj) => {
                const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
                if (findItem) {
                    setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
                    await axios.delete(`https://64a01998ed3c41bdd7a6ff00.mockapi.io/Cart/${findItem.id}`)
                }
                else{
                    setCartItems(prev => [...prev, obj]);
                    const {data} = await axios.post('https://64a01998ed3c41bdd7a6ff00.mockapi.io/Cart', obj)
                    setCartItems((prev) => prev.map(item => {
                        if(item.parentId === data.parentId){
                            return{
                                ...item,
                                id: data.id
                            };
                        }
                        return item;
                    }))
                }
            }
            findPath(obj)
        }
        catch (error){
            alert('Ошибка')
        }

    }
    const openCart = async () => {
        try{
            await axios.get('https://64a01998ed3c41bdd7a6ff00.mockapi.io/Cart').then(res => {
                setCartItems(res.data)
            })
        }
        catch (error){
            alert('Не удалось открыть корзину')
        }
        setCartOpened(true)
    }
    const onClickFavorite = async (obj) => {
        const findItem = FavoriteItems.find((item) => Number(item.parentId) === Number(obj.id));

        if (findItem){
            setFavoriteItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
            await axios.delete(`https://64a412e5c3b509573b570399.mockapi.io/follow/${findItem.id}`)
        }
        else{
            const {data} = await axios.post('https://64a412e5c3b509573b570399.mockapi.io/follow', obj)
            setFavoriteItems((prev) => [...prev, data]);
        }
    }
    const onChangeSearchInput = (event) =>{
        setSearchValue(event.target.value)
    }
    const priceCounter = () => {
        let priceCount = []
        cartItems.map(obj => priceCount.push(obj.price))
        return (priceCount.length > 0 ? priceCount.reduce((a,b) => a+b) : 0)
    }
    const isItemAdded = (id) =>{
        return cartItems.some((obj) => Number(obj.parentId) === Number(id))
    }
    const isFavoriteAdded = (id) => {
        return FavoriteItems.some((obj) => Number(obj.parentId) === Number(id))
    }

  return (
   <AppContext.Provider value={{items, cartItems, isFavorite, isItemAdded, isFavoriteAdded, setCartItems, onClickFavorite, onAddToCart}}>
       <div className="wrapper clear">
           <div>
               <Drawer items={cartItems} Count = {priceCounter()} onClickClose={() => setCartOpened(false)  } onRemove={onRemoveToCart} oppened={cartOpened}/>
           </div>

           <Header key={"Header"} onFavoriteClick={OpenFavorite} onClickCart={openCart} Count = {priceCounter()}/>
           <Route path="/" exact>
               <Slider />
               <Home
                   items={items}
                   cartItems={cartItems}
                   searchValue={searchValue}
                   onAddToCart={onAddToCart}
                   onClickFavorite={onClickFavorite}
                   onChangeSearchInput={onChangeSearchInput}
                   loading={isReady}
               />
           </Route>
           <Route path="/favorite" exact>
               <Favorite
                   items={FavoriteItems}
                   onClickFavorite={onClickFavorite}
               />
           </Route>
           <Route path={'/orders'} exact>
               <Orders/>
           </Route>
       </div>
   </AppContext.Provider>
  );
}
export default App;