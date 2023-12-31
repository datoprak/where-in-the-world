import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import CountryDetail from "./pages/CountryDetail";
import Home from "./pages/Home";
import homeLoader from "./utils/homeLoader";
import countryLoader from "./utils/countryLoader";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: ":name", element: <CountryDetail />, loader: countryLoader },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
