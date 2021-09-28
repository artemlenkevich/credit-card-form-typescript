import styles from './Card.module.css';
import chipImg from './assets/chip.png';
import visaImg from './assets/visa.png';
import mastercardImg from './assets/mastercard.png';
import amexImg from './assets/amex.png';
import discoverImg from './assets/discover.png';
import troyImg from './assets/troy.png';
import { useFormikContext } from 'formik';
import { InitialValues } from '../CardForm';
import React, { ReactElement } from 'react';

interface ICard {
    isCardFlipped: boolean,
    focusedElementName: string | null
}

export const Card: React.FC<ICard> = ({ isCardFlipped, focusedElementName }) => {
    
    const { values: { cardNumber, cardHolders, month, year, cvv } } = useFormikContext<InitialValues>();
    
    const generateNumberOnCard = (cardNumber: string): Array<ReactElement> => {
        let numberOnCard = [];

        for (let i = 0; i < 16; i++) {
            let num = cardNumber[i] ? 
            <span key={i} className={styles.card__num} data-containdata >{cardNumber[i]}</span> : 
            <span key={i} className={styles.card__num} data-nodata>#</span> ;

            numberOnCard.push(num);
        }
        return numberOnCard;
    }

    const generateCardHoldersOnCard = (cardHolders: string) => {
        if (!cardHolders.length) return <span>full name</span>;
        return cardHolders.split('').map((char, i) => <span key={i} className={styles.cardHolder__char} data-containdata>{char}</span>);
    }

    const generateCardTypeImg = (cardNumber: string) => {
        if (/^(34|37)/.test(cardNumber)) return amexImg;
        if (/^5[1-5]/.test(cardNumber)) return mastercardImg;
        if (/^6011/.test(cardNumber)) return discoverImg;
        if (/^9792/.test(cardNumber)) return troyImg;
        return visaImg;
    }

    const cardTypeImg = generateCardTypeImg(cardNumber);
    const numberOnCard = generateNumberOnCard(cardNumber);
    const cardHoldersOnCard = generateCardHoldersOnCard(cardHolders);
    const monthOnCard = month === 'Month' ? 'MM' : month ;
    const yearOnCard = year === 'Year' ? 'YY' : year.slice(2) ;
    const cvvOnCard = '*'.repeat(cvv.length);

    let cardStyles = styles.card;
    if (isCardFlipped) cardStyles += ` ${styles.cardRotate}`;
    
    return (
        <div className={cardStyles}>
            <div className={styles.card__side + ' ' + styles.card__front}>
                <div className={styles.card__focus} data-focuson={focusedElementName}/>
                <div className={styles.card__frontContent}>
                    <img className={styles.card__protectLabel} src={chipImg} alt=''/>
                    <img className={styles.card__cardType} src={cardTypeImg} alt=''/>
                    <label className={styles.card__cardNumber} htmlFor='cardNumber'>
                        {numberOnCard}
                    </label>
                    <label className={styles.card__cardHolder} htmlFor='cardHolders'>
                        <div className={styles.card__requisiteTitle}>Card Holder</div>
                        <div className={styles.card__requisiteContent}>{cardHoldersOnCard}</div>
                    </label>
                    <div className={styles.card__expires}>
                        <div className={styles.card__requisiteTitle}>Expires</div>
                        <div className={styles.card__requisiteContent}>
                            <label className={styles.card__month} htmlFor='month'>{monthOnCard}</label>/<label className={styles.card__year} htmlFor='year'>{yearOnCard}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.card__side + ' ' + styles.card__back}>
                <div className={styles.card__magnitBand}></div>
                <div className={styles.card__cvvTitle}>CVV</div>
                <div className={styles.card__cvvBand}>{cvvOnCard}</div>
                <img className={styles.card__cardTypeBack} src={cardTypeImg} alt=''/>
            </div>
        </div>
    )
};