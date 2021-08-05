import styles from './App.module.css';
import { CardForm } from './components/CardForm/CardForm';

function App() {
  return (
    <div className={styles.container}>
        <CardForm />
    </div>
  );
}

export default App;
