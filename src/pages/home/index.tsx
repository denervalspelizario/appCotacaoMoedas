import styles from './home.module.css'
import {Link} from 'react-router-dom'

// instalacao de biblioteca react-icons comando = npm install react-icons
// documentacao de biblioteca https://react-icons.github.io/react-icons/ 

import { BiSearch } from 'react-icons/bi'  // importando icon de biblioteca react-icons


export default function Home(){
  return(
    <main className={styles.container}>
        <form className={styles.form}>
          <input
            placeholder='Digite o simbolo da moeda:  BTC '
          />
          
          <button type='submit'>
            <BiSearch  size={30} color='#FFF' />
          </button>
        </form>

        <table>
          <thead>  
            <tr>
              <th scope='col'>Moeda</th>
              <th scope='col'>Valor Mercado</th>
              <th scope='col'>Preço</th>
              <th scope='col'>Volume</th>
            </tr>
          </thead>

          <tbody id='tbody'>
            <tr className={styles.tr}>
              
              <td className={styles.tdLabel} data-label='Moeda' > 
                <Link className={styles.link} to='/detail/btc' >
                  <span>Bitcoin</span> | BTC
                </Link>
              </td>
            
              <td className={styles.tdLabel} data-label='Mercado'> 
                R$ 19293
              </td>

              <td className={styles.tdLabel} data-label='Preco'> 
                R$ 40.96233
              </td>

              <td className={styles.tdProfit} data-label='Volume'> {/* Este td vai variar de cor por isso classe nome diferente e span */} 
                <span>-5.3</span>
              </td>
            </tr>
          </tbody>
        </table>
    </main>
  )
}