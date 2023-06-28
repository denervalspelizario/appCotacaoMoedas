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
    ]
  }
])

export { router };