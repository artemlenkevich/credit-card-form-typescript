import { useField } from "formik";
import styles from '../CardFields.module.css';

interface ICardSelect {
    name: string,
    options: Array<number>
}

export const CardSelect: React.FC<ICardSelect> = ({options, ...props}) => {
    const [field] = useField(props);

    return (
        <select className={styles.input} {...field} {...props} id={field.name}>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    )
}