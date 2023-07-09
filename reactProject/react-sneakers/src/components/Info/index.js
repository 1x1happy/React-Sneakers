import './Info.module.scss'
import styles from './Info.module.scss'
import React from "react";
import {Link} from "react-router-dom";
const Info = ({title, description, onClickClose, imageUrl, setIsComplete, backHome, imgHeight, imgWidth}) =>{
    const Close = () => {
            setIsComplete(false)
            onClickClose()
    }
    return(
        <>
            <img className="mb-20" width={imgWidth} height={imgHeight} src={imageUrl} alt="empty"/>
            <div className="d-flex flex-column">
                <h3 className="text-center mb-10">{title}</h3>
                <p className={styles.textDescription}>{description}</p>
            </div>
            {backHome ?
                <Link to={'/'}>
                    <button className={styles.backCartBtn}><img src="/img/array-left.png" alt="arrow"/>
                        Вернутся назад
                    </button>
                </Link>:
                <button className={styles.backCartBtn}  onClick={Close}><img src="/img/array-left.png" alt="arrow"/>
                    Вернутся назад
                </button>
            }
        </>
    )
}
export default Info