import { Link } from 'react-router-dom'
import styles from './header.module.css'; // importando o estilo
import logoImg from '../../assets/cripto.png';



export default function Header(){
  return(
    <header className={styles.container}>
      <div className={styles.logo}>
        
        <Link to='/'>
          <img src={logoImg} alt="Logo Cripto" className={styles.logoStyle} />  {/* Ao clicar na img vai pra home */} 
        </Link>
        
      </div>
    </header>
  )
}