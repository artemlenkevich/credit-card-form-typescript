import { Form, Formik } from 'formik';
import { CardField } from './CardFields/CardField/CardField';
import { CardSelect } from './CardFields/CardSelect/CardSelect';
import styles from './CardForm.module.css';
import cardFieldsStyles from './CardFields/CardFields.module.css';
import { Card } from './Card/Card';
import React, { useState } from 'react';

interface ICardForm {
    onFormSubmit: (values: InitialValues) => void
}

let initialValues = {
    cardNumber: '',
    cardHolders: '',
    month: 'Month',
    year: 'Year',
    cvv: ''
}

export type InitialValues = typeof initialValues;

const monthOptions = ['Month', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const yearOptions = ['Year', '2021', '2022', '2023', '2024', '2025', '2026'];

export const CardForm: React.FC<ICardForm> = ({ onFormSubmit }) => {
    
    let [isCardFlipped, flipCard] = useState(false);
    let [focusedElementName, setFocusOn] = useState<string | null>(null);

    const validate = ({cardNumber, cardHolders, cvv, month, year}: InitialValues) => {
        const errors: Partial<InitialValues> = {};
        if (cardNumber.length < 16) {
            errors.cardNumber = 'Must be 16 characters';
        }

        if (cardHolders.length < 5) {
            errors.cardHolders = 'Must be 5 characters or more';
        }

        if (cvv.length < 3) {
            errors.cvv = 'Must be 3 characters';
        }

        if (month === 'Month') {
            errors.month = 'Please choose month';
        }
        
        if (year === 'Year') {
            errors.year = 'Please choose year';
        }

        return errors;
    }

    const onFormFocus = (e: React.FocusEvent<HTMLFormElement>) => {
        const input = e.target;
        setFocusOn(input.name);
    }

    const onFormBlur = () => {
        setFocusOn(null);
    }

    const onCvvFocus = () => {
        flipCard(true);
    }

    const onCvvBlur = () => {
        flipCard(false);
    }

    const cardNumberPattern = (value: string): boolean => {
        return value.length <=16 && /^[0-9]*$/.test(value);
    }

    const cardHoldersPattern = (value: string): boolean => {
        return value.length <= 20 && /^[a-zA-Z ]*$/.test(value); 
    }

    const cvvPattern = (value: string): boolean => {
        return value.length <= 3 && /^[0-9]*$/.test(value);
    }

    return (
        <div className={styles.cardForm}>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onFormSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                <Form onFocus={onFormFocus} onBlur={onFormBlur}>
                    <Card isCardFlipped={isCardFlipped} focusedElementName={focusedElementName}/>
                    <div className={styles.fieldWrapper}>
                        <CardField name='cardNumber' type='text' label='Card Number' id='cardNumber' checkPattern={cardNumberPattern} />
                    </div>
                    <div className={styles.fieldWrapper}>
                        <CardField name='cardHolders' type='text' label='Card Holders' id='cardHolders' checkPattern={cardHoldersPattern}/>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.expirationDate}>
                            <label className={cardFieldsStyles.label} htmlFor="">Expiration Date</label>
                            <div className={styles.selectWrapper}>
                                <CardSelect name='month' options={monthOptions}/>
                            </div>
                            <div className={styles.selectWrapper}>
                                <CardSelect name='year' options={yearOptions}/>
                            </div>
                        </div>
                        <div className={styles.cvv}>
                            <CardField name='cvv' type='text' label='CVV' id='cvv' checkPattern={cvvPattern} onFocus={onCvvFocus} onBlur={onCvvBlur}/>
                        </div>
                    </div>
                    <button className={styles.submit} type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
    )
}