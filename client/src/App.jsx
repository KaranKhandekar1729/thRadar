import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../src/routes/Routes.jsx'

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
