import {useEffect, useState} from 'react'
import styles from './detail.module.css';
import  {useParams} from 'react-router-dom' // O useParams para acessar o nome da rota usada la no input da home(olhar routes)

interface EstruturaMoedaProps {  // interface que vai tipar a state coins demonstrando como eu quero que venha os dados da api
  name: string;
  delta_24: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  low_24h: string;
  high_24: string;
  total_volume_24h: string;
  delta_24h: string;
  formatedPrice: string;  // esta propriedade foi criado pela formatacao  não vem da api(atenção)
  formatedMarket: string; // esta propriedade foi criado pela formatacao  não vem da api(atenção) 
  formatedLowprice: string; // esta propriedade foi criado pela formatacao  não vem da api(atenção)
  formatedHighprice: string; // esta propriedade foi criado pela formatacao  não vem da api(atenção)
  error?: string;  // propriedade opcional por isso o ?
}



export default function Detail(){
  const { cripto  } = useParams(); // pq cripto? pq foi esse o nome da rota dinamica usada(olhar em routes)
  const [detail, setDetail] = useState<EstruturaMoedaProps>() // state esta tipada com a interface EstruturaMoedaprops que recebera dados da api
  const [ loading, setLoading] = useState(true);  // state para loading

  useEffect(() => {

    function getData(){
       fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=f4020889af14ea44&pref=BRL&symbol=${cripto}`)  // pegando a url da api 
       .then(response => response.json()) //deu certo jogo esses dados em response e depois esses dados em json
       .then((data: EstruturaMoedaProps) => {
          
        //formatando dados da api
        //Essa variavel abaixo recebe um objeto Intl.NumberFormat que formata números como moeda no estilo da localidade brasileira ("pt-BR") e usando a moeda brasileira ("BRL").
        let price = Intl.NumberFormat("pt-BR", {
          style: "currency", //  indicando que o formato desejado é de uma moeda
          currency: "BRL" // Aqui, a propriedade currency é definida como "BRL", que representa a moeda brasileira, o real.
        })

        // const que vai receber os dados ja formatdos em brl 
        const resultData = {
          ...data, // atravez do spread operator passando todos os dados que estao data ja formatados pelo pela interfaceEstruturaMoedas e adicuiono com os dados abaixp
          formatedPrice: price.format(Number(data.price)),        //formatando o dado price  
          formatedMarket: price.format(Number(data.market_cap)),  //formatando o dado valor de mercado  
          formatedLowprice: price.format(Number(data.low_24h)),   //formatando o dado menor preco 24h
          formatedHighprice: price.format(Number(data.high_24)),  //formatando o dado maior preco 24h
        }

        setDetail(resultData) // passando os dados ja formatados para a state detail
        setLoading(false)  // como os dados ja chegaram então altero a state loading para false para renderizar os dados

       })
    }

    getData() // chamando o getdata senão não funciona

  },[cripto]) // toda vez que sofrer alguma alteração cripto esse useEffect será chamado


  if(loading){  // se çloading estiver true ou seja não carregou os dados ainda então
    return(
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando informações...</h4>
      </div>
    )
  }

  return( // estando loading em false ou seja dados ja chegaram então renderiza aqui
    <div className={styles.container}>
      <h1 className={styles.center}>{detail?.name} </h1>
      <p className={styles.center}>{detail?.symbol}</p>
    </div>
  )
}