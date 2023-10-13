import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import CountryDetail from "./pages/CountryDetail";
import Home from "./pages/Home";
import homeLoader from "./utils/homeLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "country", element: <CountryDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
