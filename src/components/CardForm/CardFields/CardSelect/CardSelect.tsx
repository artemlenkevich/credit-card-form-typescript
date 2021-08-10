import { useField } from "formik";
import styles from '../CardFields.module.css';

interface ICardSelect {
    name: string,
    options: Array<string>
}

export const CardSelect: React.FC<ICardSelect> = ({options, ...props}) => {
    const [field, meta] = useField(props);

    let inputStyles = styles.input;
    if (meta.error) inputStyles += ` ${styles.input_error}`;

    return (
        <select className={inputStyles} {...field} {...props} id={field.name}>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    )
}