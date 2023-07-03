import styles from './home.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { BiSearch } from 'react-icons/bi'  // importando icon de biblioteca react-icons
import {FormEvent, useEffect, useState} from 'react';


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
  const [valorInput, setValorInput] = useState('') // state que recebe valor de input
  const navigate = useNavigate();


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

        const formatResult = coinsData.map((item) => { // atravez do map percorre todos os objetos de coinsData joga em item
          const formated = { //formated recebe os dados de coinsData atravez do ...item
            ...item,
            formatedPrice: price.format(Number(item.price)), //  formatando o dado price  
            formatedMarket: price.format(Number(item.market_cap)) // formatando o dado market_cap(valor de mercado)
          }

          return formated // faz todo o map e retorna o formated com os dados formatados  que nos vamos pegar assim que chamar a variavel formatResult
        })

        setMoedas(formatResult)  // passando os dados da api ja formatada(formatResult) para state Moedas que vamos usar para renderizar os dados
        console.log(formatResult)

      })
      .catch((error) => { // requisição deu errado então

        console.log(error) // retorno o erro

      })
    }

    getData()


  }, []) // como esta vazia se inicia ao startar a aplicação

  // FUNCAO QUE DIRECIONA USUARIO A ROTA DA MOEDA QUE FOR DIGITADA NO INPUT
  function handleSearch(event: FormEvent){  // a funcao recebe o parametro event do tipo FormEvent(lembre-se tem que importa-la do react)
    event.preventDefault(); // evitando atualizar a pagina toda vem que ativa a funcao
    
    if(valorInput === ''){ // se state valorInput esta vazia(usuario não digitou nada) então
      return // não retorma nada
    
    } else { // se tiver algo então

      navigate(`/detail/${valorInput}`) // navega para rota de valorInput
    }
  }


  return(
    <main className={styles.container}>
        <form  className={styles.form} onSubmit={handleSearch}> {/*formulario ao digitar ativa funcao search() */}
          <input
            placeholder='Digite o simbolo da moeda:  BTC '
            value={valorInput} 
            onChange={(event)=> setValorInput(event.target.value)} // tudo que for digitado no input será adicionado na state valorInput
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
              
            </tr>
          </thead>

          <tbody id='tbody'>
            {moedas.map( moeda => ( // dados da state moedas repassa para moeda e renderiza atravez do map
              <tr                      // quandos e faz o map sempre o primeiro item precisa da key para se ter referencia
                className={styles.tr} 
                key={moeda.name}
              >
                <td className={styles.tdLabel} data-label='Moeda' > 
                  <Link 
                    className={styles.link} 
                    to={`/detail/${moeda.symbol}`}  // toda vez que cliclar na moeda direciona para rota 
                  >
                    <span>{moeda.name}</span> | {moeda.symbol}  
                  </Link>
                </td>
            
                <td className={styles.tdLabel} data-label='Mercado'> 
                  {moeda.formatedMarket}
                </td>

                <td className={styles.tdLabel} data-label='Preco'> 
                  {moeda.formatedPrice}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
    </main>
  )
}