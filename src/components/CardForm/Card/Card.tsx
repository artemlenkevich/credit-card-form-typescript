import styles from './Card.module.css';
import chipImg from './assets/chip.png';
import visaImg from './assets/visa.png';
import classNames from 'classnames';

interface ICard {
    isCardFlipped: boolean
}

export const Card: React.FC<ICard> = ({isCardFlipped}) => {
    
    return (
        <div className={classNames(styles.card, {[styles.cardRotate]: isCardFlipped})}>
            <div className={styles.card__side + ' ' + styles.card__front}>
                <div className={styles.card__focus}></div>
                <div className={styles.card__frontContent}>
                    <img className={styles.card__protectLabel} src={chipImg} alt=''/>
                    <img className={styles.card__visaLabel} src={visaImg} alt=''/>
                    <label className={styles.card__cardNumber} htmlFor='cardNumber'>
                        <span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span><span className={styles.card__num} data-noData>#</span>
                    </label>
                    <label className={styles.card__cardHolder} htmlFor='cardHolders'>
                        <div className={styles.card__requisiteTitle}>Card Holder</div>
                        <div className={styles.card__requisiteContent}><span data-plug>FULL NAME</span></div>
                    </label>
                    <div className={styles.card__expires}>
                        <div className={styles.card__requisiteTitle}>Expires</div>
                        <div className={styles.card__requisiteContent}>
                            <label className={styles.card__month} htmlFor='month'>MM</label>/<label className={styles.card__year} htmlFor='year'>YY</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.card__side + ' ' + styles.card__back}>
                <div className={styles.card__magnitBand}></div>
                <div className={styles.card__cvvTitle}>CVV</div>
                <div className={styles.card__cvvBand}></div>
                <img className={styles.card__visaLabelBack} src={visaImg} alt=''/>
            </div>
        </div>
    )
}