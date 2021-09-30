import styles from './App.module.css';
import { CardForm, InitialValues } from './components/CardForm/CardForm';

export const onFormSubmit = (values: InitialValues) => {
  alert(`
  Сard Number: ${values.cardNumber}
  Card Holders: ${values.cardHolders}
  Expires: ${values.month}/${values.year}
  cvv: ${values.cvv}`);
}

// let arr = [] as Array<new() => ReactElement<any, any>>;

// for (let i = 0; i < 10; i++) {
//   arr.push(<div>i</div>)
// }

let Component:React.FC<{element: JSX.Element}> = ({element}) => {
  return element
}

function App() {
  return (
    <div className={styles.container}>
        <CardForm onFormSubmit={onFormSubmit}/>
        <Component element={<div>1</div>}/>
    </div>
  );
}

export default App;
