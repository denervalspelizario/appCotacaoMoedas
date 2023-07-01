import styles from './detail.module.css';
import  {useParams} from 'react-router-dom' // O useParams para acessar o nome da rota usada la no input da home(olhar routes)

export default function Detail(){

  const { cripto  } = useParams(); // pq cripto? pq foi esse o nome da rota dinamica usada(olhar em routes)

  return(
    <div>
      <h1>Pagina Detalhes {cripto} </h1>
    </div>
  )
}