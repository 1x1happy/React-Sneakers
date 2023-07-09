import styles from './slider.module.scss'

const Slider = () =>{
    return(
        <section className={styles.sliderSection}>
            <div className={styles.slider}>
                <div className={styles.left}>
                    <img height={40} width={99} src="/img/slider-adidasDisney.png" alt=""/>
                    <div className={styles.sliderHeading}>
                        <h1 className={styles.Stan}>Stan Smith,</h1>
                        <br/><h1 className={styles.forever}>Forever!</h1>
                    </div>
                    <button className={styles.sliderBtn}>Купить</button>
                </div>
                <div className={styles.right}>
                    <img src="/img/slider-img.png" alt=""/>
                </div>
            </div>
        </section>
    )
}

export default Slider