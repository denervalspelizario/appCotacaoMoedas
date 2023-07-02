import styles from './notfound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return(
    <div className={styles.container}>
      <h1>Ops erro 404 pagina não existe</h1>

      <Link to='/'>

        Acessar cripto moedas
      </Link>
    </div>
  )
}