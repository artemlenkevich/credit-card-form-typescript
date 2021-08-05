import { Form, Formik } from 'formik';
import { CardField } from './CardFields/CardField/CardField';
import { CardSelect } from './CardFields/CardSelect/CardSelect';
import styles from './CardForm.module.css';
import cardFieldsStyles from './CardFields/CardFields.module.css';
import { Card } from './Card/Card';
import { useState } from 'react';

let initialValues = {
    cardNumber: '',
    cardHolders: '',
    month: 1,
    year: 2021,
    cvv: ''
}

const monthOptions = Array.from(Array(13).keys());
const yearOptions = [2021, 2022, 2023, 2024, 2025, 2026];


export const CardForm: React.FC<{}> = () => {
    let [isCardFlipped, flipCard] = useState(false);

    const onCvvFocus = () => {
        flipCard(true);
        console.log('focus');  
    }

    const onCvvBlur = () => {
        flipCard(false);
        console.log('blur')
    }

    return (
        <div className={styles.cardForm}>
            <Card isCardFlipped={isCardFlipped} />
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                <Form>
                    <div className={styles.fieldWrapper}>
                        <CardField name='cardNumber' type='text' label='Card Number' />
                    </div>
                    <div className={styles.fieldWrapper}>
                        <CardField name='cardHolders' type='text' label='Card Holders' />
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
                            <CardField name='cvv' type='text' label='CVV' onFocus={onCvvFocus} onBlur={onCvvBlur}/>
                        </div>
                    </div>
                    <button className={styles.submit} type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
    )
}