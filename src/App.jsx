import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Benefits from './components/Benefits.jsx';
import Programs from './components/Programs.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import styles from './App.module.css';
export default function App(){return <div className={styles.shell}><Header/><main className={styles.main}><Hero/><Benefits/><Programs/><RegistrationForm/><FAQ/></main><Footer/></div>}
