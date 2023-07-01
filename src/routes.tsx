import {createBrowserRouter} from 'react-router-dom';

import Home from './pages/home';
import Detail from './pages/detail';
import NotFound from './pages/notfound';
import Layout from './components/layout';

const router = createBrowserRouter([
  {
    element: <Layout/>, // chamandoi layout que vai rederizar todos os elementos filhos abaixo
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/detail/:cripto',  // estou indicando atravez com o simbolo : que é uma rota dinamica
        element:<Detail/>
      },
      {
        path: '*',          // rota de erro ou inexistente
        element:<NotFound />
      }
    ]
  }
])

export { router };