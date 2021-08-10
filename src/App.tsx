import styles from './App.module.css';
import { CardForm, InitialValues } from './components/CardForm/CardForm';

export const onFormSubmit = (values: InitialValues) => {
  console.log(`
  Сard Number: ${values.cardNumber}
  Card Holders: ${values.cardHolders}
  Expires: ${values.month}/${values.year}
  cvv: ${values.cvv}`);
}

function App() {
  return (
    <div className={styles.container}>
        <CardForm onFormSubmit={onFormSubmit}/>
    </div>
  );
}

export default App;
