import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import ProductDetailPage from './pages/ProductDetail';

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>
// );
// const router = createBrowserRouter(routeDefinitions);

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/', 
        element: <HomePage />
      },
      {
        path: '/products', 
        element: <ProductsPage />
      },
      {
        path: '/products/:productId',
        element: <ProductDetailPage />
      }
    ]
  }
  
])



function App() {
  return <RouterProvider router={router}/>;
}

export default App;
