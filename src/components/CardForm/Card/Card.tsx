import styles from './Card.module.css';
import chipImg from './assets/chip.png';
import visaImg from './assets/visa.png';
import mastercardImg from './assets/mastercard.png';
import amexImg from './assets/amex.png';
import discoverImg from './assets/discover.png';
import troyImg from './assets/troy.png';
import { useFormikContext } from 'formik';
import { InitialValues } from '../CardForm';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface ICard {
    cardIsFlipped: boolean
    focusedElementName: string | null
}

interface ICardNumber {
    number: string
}

interface ICardType {
    src: string
}

interface ICardHolders {
    name: string
}

interface ICardExpires {
    month: string
    year: string
}

export const Card: React.FC<ICard> = ({ cardIsFlipped, focusedElementName }) => {

    const { values: { cardNumber, cardHolders, month, year, cvv } } = useFormikContext<InitialValues>();

    const generateNumberOnCard = (cardNumber: string): string => {
        cardNumber = cardNumber + '#'.repeat(16 - cardNumber.length);
        let CardNumberWithAsterisk = cardNumber.split('').map((char, i) => i >= 4 && i <= 11 && char !== '#' ? '*' : char).join('');
        /* From 4 to 11 char is replaced to asterisk  */
        return CardNumberWithAsterisk;
    }

    const generateCardHoldersOnCard = (cardHolders: string) => {
        if (!cardHolders.length) {
            return 'full name';
        }
        return cardHolders;
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
    const monthOnCard = month === 'Month' ? 'MM' : month;
    const yearOnCard = year === 'Year' ? 'YY' : year.slice(2);
    const cvvOnCard = '*'.repeat(cvv.length);

    let cardStyles = styles.card;
    if (cardIsFlipped) cardStyles += ` ${styles.cardRotate}`;

    return (
        <div className={cardStyles}>
            <div className={styles.card__side + ' ' + styles.card__front}>
                <div className={styles.card__focus} data-focuson={focusedElementName} />
                <div className={styles.card__frontContent}>
                    <img className={styles.card__protectLabel} src={chipImg} alt='' />
                    <CardType src={cardTypeImg} />
                    <CardNumber number={numberOnCard} />
                    <CardHolders name={cardHoldersOnCard} />
                    <CardExpires month={monthOnCard} year={yearOnCard} />
                </div>
            </div>
            <div className={styles.card__side + ' ' + styles.card__back}>
                <div className={styles.card__magnitBand}></div>
                <div className={styles.card__cvvTitle}>CVV</div>
                <div className={styles.card__cvvBand}>{cvvOnCard}</div>
                <img className={styles.card__cardTypeBack} src={cardTypeImg} alt='' />
            </div>
        </div>
    )
};

const CardType: React.FC<ICardType> = ({ src }) => {
    return <div className={styles.card__cardType_container}>
        <WithFadeUpTransition>
            <img className={styles.card__cardType} src={src} alt='' />
        </WithFadeUpTransition>
    </div>
}

const CardExpires: React.FC<ICardExpires> = ({ month, year }) => {
    return (
        <div className={styles.card__expires}>
            <div className={styles.card__requisiteTitle}>Expires</div>
            <div className={styles.card__requisiteContent}>
                <label className={styles.card__month_container} htmlFor='month'>
                    <WithFadeUpTransition>
                        <span className={styles.card__month}>{month}</span>
                    </WithFadeUpTransition>
                </label>
                /
                <label className={styles.card__year_container} htmlFor='month'>
                    <WithFadeUpTransition>
                        <span className={styles.card__year}>{year}</span>
                    </WithFadeUpTransition>
                </label>
            </div>
        </div>
    )
}

const CardNumber: React.FC<ICardNumber> = ({ number }) => {
    let charsArr = number.split('');
    for (let i = 4; i < charsArr.length - 1; i += 6) {
        charsArr.splice(i, 0, ' ', ' ')
    }
    
    return (
        <label className={styles.card__cardNumber} htmlFor='cardNumber'>
            <WithFadeUpTransition>
                {charsArr.map((n, i) => {
                    return <span key={n + i} className={styles.card__num}>{n}</span>
                })}
            </WithFadeUpTransition>
        </label>
    )
}

const CardHolders: React.FC<ICardHolders> = ({ name }) => {
    let chars = [];

    if (name.startsWith('full name')) {
        chars.push(name)
    } else {
        chars = name.split('');
    }
    let charsArr = chars.map((n, i) => <span key={i} className={styles.cardHolder__char}>{n}</span>)

    return (
        <label className={styles.card__cardHolder} htmlFor='cardHolders'>
            <div className={styles.card__requisiteTitle}>Card Holder</div>
            <div className={styles.card__requisiteContent}>
                <WithFadeUpTransition>
                    {charsArr}
                </WithFadeUpTransition>
            </div>
        </label>
    )
}

/* Receive array or one element and return elements with transition.
   Accept img elements */
const WithFadeUpTransition: React.FC<{ children: Array<JSX.Element> | JSX.Element }> = ({ children }) => {
    if (!Array.isArray(children)) children = [children];

    return <TransitionGroup component={null}>
                {
                    children.map((element: any, i) => {

                        let key = element.props.children + i;
                        if (element.type === 'img') key = element.props.src;

                        return <CSSTransition
                                    key={key}
                                    timeout={300}
                                    classNames={{
                                        enter: styles.slideFadeUpEnter,
                                        enterActive: styles.slideFadeUpEnterActive,
                                        exit: styles.slideFadeUpExit,
                                        exitActive: styles.slideFadeUpExitActive
                                    }}>
                                    {element}
                               </CSSTransition>
                    })
                }
            </TransitionGroup>
}