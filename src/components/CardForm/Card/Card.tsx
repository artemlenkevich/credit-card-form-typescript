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
    isCardFlipped: boolean
    focusedElementName: string | null
}

export const Card: React.FC<ICard> = ({ isCardFlipped, focusedElementName }) => {

    const { values: { cardNumber, cardHolders, month, year, cvv } } = useFormikContext<InitialValues>();

    const generateNumberOnCard = (cardNumber: string): string => {
        if (cardNumber.length < 16) cardNumber = cardNumber + '#'.repeat(16 - cardNumber.length);
        return cardNumber;
    }

    const generateCardHoldersOnCard = (cardHolders: string) => {
        if (!cardHolders.length) {
            return 'full name' + ' '.repeat(11);
        } else {
            return cardHolders + ' '.repeat(20 - cardHolders.length);
        }
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
    if (isCardFlipped) cardStyles += ` ${styles.cardRotate}`;

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

interface ICardType {
    src: string
}

const CardType: React.FC<ICardType> = ({ src }) => {
    return <div className={styles.card__cardType_container}>
                <TransitionGroup exit={true} component={null}>
                    <CSSTransition
                        key={src}
                        timeout={300}
                        classNames={{
                            enter: styles.slideFadeUpEnter,
                            enterActive: styles.slideFadeUpEnterActive,
                            exit: styles.slideFadeUpExit,
                            exitActive: styles.slideFadeUpExitActive
                        }}>
                        <img className={styles.card__cardType} src={src} alt='' />
                    </CSSTransition>
                </TransitionGroup>
            </div>
}

interface ICardExpires {
    month: string
    year: string
}

const CardExpires: React.FC<ICardExpires> = ({ month, year }) => {
    return (
        <div className={styles.card__expires}>
            <div className={styles.card__requisiteTitle}>Expires</div>
            <div className={styles.card__requisiteContent}>
                <label className={styles.card__month_container} htmlFor='month'>
                    <TransitionGroup component={null}>
                        <CSSTransition
                            key={month}
                            timeout={300}
                            classNames={{
                                enter: styles.slideFadeUpEnter,
                                enterActive: styles.slideFadeUpEnterActive,
                                exit: styles.slideFadeUpExit,
                                exitActive: styles.slideFadeUpExitActive
                            }}>
                            <span className={styles.card__month}>{month}</span>
                        </CSSTransition>
                    </TransitionGroup>
                </label>
                /
                <label className={styles.card__year_container} htmlFor='month'>
                    <TransitionGroup component={null}>
                        <CSSTransition
                            key={year}
                            timeout={300}
                            classNames={{
                                enter: styles.slideFadeUpEnter,
                                enterActive: styles.slideFadeUpEnterActive,
                                exit: styles.slideFadeUpExit,
                                exitActive: styles.slideFadeUpExitActive
                            }}>
                            <span className={styles.card__year}>{year}</span>
                        </CSSTransition>
                    </TransitionGroup>
                </label>
            </div>
        </div>
    )
}

interface ICardNumber {
    number: string
}

const CardNumber: React.FC<ICardNumber> = ({ number }) => {
    return (
        <label className={styles.card__cardNumber} htmlFor='cardNumber'>
            {number.split('').map((n, i) => {
                return <div key={i} className={styles.card__num_wrapper}>
                    <TransitionGroup component={null}>
                        <CSSTransition
                            key={i + n}
                            timeout={300}
                            classNames={{
                                enter: styles.slideFadeUpEnter,
                                enterActive: styles.slideFadeUpEnterActive,
                                exit: styles.slideFadeUpExit,
                                exitActive: styles.slideFadeUpExitActive
                            }}>
                            <span className={styles.card__num}>{n}</span>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            })}
        </label>
    )
}

interface ICardHolders {
    name: string
}

const CardHolders: React.FC<ICardHolders> = ({ name }) => {
    let chars = [];

    if (name.startsWith('full name')) {
        chars.push(name)
    } else {
        chars = name.split('');
    }

    return (
        <label className={styles.card__cardHolder} htmlFor='cardHolders'>
            <div className={styles.card__requisiteTitle}>Card Holder</div>
            <div className={styles.card__requisiteContent}>
                {chars.map((n, i) => {
                    return <div key={i} className={styles.cardHolder__char_container}>
                        <TransitionGroup component={null}>
                            <CSSTransition
                                key={i + n}
                                timeout={300}
                                classNames={{
                                    enter: styles.slideFadeUpEnter,
                                    enterActive: styles.slideFadeUpEnterActive,
                                    exit: styles.slideFadeUpExit,
                                    exitActive: styles.slideFadeUpExitActive
                                }}>
                                <span className={styles.cardHolder__char}>{n}</span>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                })}
            </div>
        </label>
    )
}