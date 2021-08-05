import { useField } from 'formik';
import styles from '../CardFields.module.css';

interface ICardField {
    name: string,
    type: string,
    label: string,
    onFocus?: () => void,
    onBlur?: () => void
}

export const CardField: React.FC<ICardField> = ({label, ...props}) => {
    const [field] = useField(props);
    
    return (
        <div className={styles.cardField}>
            <label className={styles.label} htmlFor={field.name}>{label}</label>
            <input className={styles.input} {...field} {...props} id={field.name} />
        </div>
    )
}