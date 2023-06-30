import styles from './home.module.css';
import {Link} from 'react-router-dom';
import { BiSearch } from 'react-icons/bi'  // importando icon de biblioteca react-icons
import {useEffect, useState} from 'react';


// instalacao de biblioteca react-icons comando = npm install react-icons
// documentacao de biblioteca https://react-icons.github.io/react-icons/ 

// https://sujeitoprogramador.com/api-cripto/?key=f4020889af14ea44&pref=BRL
// O coinlib inibi o uso de api direto no front então estamso usando uma mascara do curso 
// para porder usar a api do coinlib então apesar da url ser do curso essa api é do coinlib

interface EstruturaMoedaProps {  // interface que vai tipar a state coins demonstrando como eu quero que venha os dados da api
  name: string;
  delta_24: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;  // esta propriedade foi criado pela formatacao  não vem da api(atenção)
  formatedMarket: string; // esta propriedade foi criado pela formatacao  não vem da api(atenção) 
}


interface DataProps {  // criando a interface dataprops que tem uma coins que recebe array com a estrutura da EstruturaMoedaProps
  coins: EstruturaMoedaProps[]
}


export default function Home(){

  const [moedas, setMoedas] = useState<EstruturaMoedaProps[]>([]) // state que é uma array que vai receber os dados formatados da api(coinsData)
                                                                // state esta tipada com a interface EstruturaMoedaprops


  // FUNCAO ASSINCRONA QUE FAZ A REQUISIÇÃO DA API 
  useEffect(() => {

    async function getData(){

      fetch('https://sujeitoprogramador.com/api-cripto/?key=f4020889af14ea44&pref=BRL') // fazendo a requisição
      .then(response => response.json()) // deu certo a requisicao tranformo ela em response e depois ela em um json
      .then((data: DataProps) => { // data tipado com DataProps
        // a requisição deu tudo certo temos acesso a api inteira
        let coinsData = data.coins.slice(0, 20); // pegando la da api apenas 15 primeiras apartir da posicao 0

        //formatando dados da api
        //Essa variavel abaixo recebe um objeto Intl.NumberFormat que formata números como moeda no estilo da localidade brasileira ("pt-BR") e usando a moeda brasileira ("BRL").
        let price = Intl.NumberFormat("pt-BR", {
          style: "currency", //  indicando que o formato desejado é de uma moeda
          currency: "BRL" // Aqui, a propriedade currency é definida como "BRL", que representa a moeda brasileira, o real.
        })

        const formatResult = coinsData.map((item) => { // atravez do map percorre todos os objetos de CoinsData joga em item
          const formated = { //formated recebe os dados de coinsData atravez do ...item
            ...item,
            formatedPrice: price.format(Number(item.price)), //  formatando o dado price  
            formatedMarket: price.format(Number(item.market_cap)) // formatando o dado market_cap(valor de mercado)
          }

          return formated // faz todo o map e retorna o formated com os dados formatados  que nos vamos pegar assim que chamar a variavel formatResult
        })

        setMoedas(formatResult)  // passando os dados da api ja formatada(formatResult) para state Moedas que vamos usar para renderizar os dados

      })
      .catch((error) => { // requisição deu errado então

        console.log(error) // retorno o erro

      })
    }

    getData()


  }, []) // como esta vazia se inicia ao startar a aplicação



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