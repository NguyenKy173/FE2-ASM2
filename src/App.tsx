
import { useRoutes } from 'react-router-dom'
import ProductList from './pages/product/list'
import ProductAdd from './pages/product/add'
import ProductEdit from './pages/product/edit'

function App() {
  let element = useRoutes(
    [
      { path: "/list", element: <ProductList /> },
      { path: "/add", element: <ProductAdd /> },
      { path: "/product/:id/edit", element: <ProductEdit /> },
    ],
    
)

  return (
    <>
      {element}
    </>
  )
}

export default App
