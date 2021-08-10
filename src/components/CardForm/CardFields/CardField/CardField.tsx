import { useField } from 'formik';
import React from 'react';
import styles from '../CardFields.module.css';

interface ICardField {
    name: string,
    type: string,
    label: string,
    id?: string,
    maxLength?: number,
    checkPattern?: (value: string) => boolean ,
    onFocus?: () => void,
    onBlur?: () => void
}

export const CardField: React.FC<ICardField> = ({label, checkPattern , ...props}) => {
    const [field, meta, {setValue}] = useField(props);
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fieldValue = e.target.value;
        if (checkPattern === undefined) {
            setValue(fieldValue);
            return;
        }
        const valueIsCorrect = checkPattern(fieldValue);
        if (valueIsCorrect) {
            setValue(fieldValue);
        }
    }

    let inputStyles = styles.input;
    if (meta.error) inputStyles += ` ${styles.input_error}`;

    return (
        <div className={styles.cardField}>
            <label className={styles.label} htmlFor={props.id}>{label}</label>
            <input className={inputStyles} {...field} {...props} onChange={onChange}/>
            
        </div>
    )
}