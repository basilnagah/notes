import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  let routing = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        {
          index: true, element: <ProtectedRoute>
            <Home></Home>

          </ProtectedRoute>
        },
        { path: "register", element: <Register></Register> },
        { path: "login", element: <Login></Login> },
      ],
    },
  ]);

  return (
    <>
      <RecoilRoot>
        <RouterProvider router={routing}></RouterProvider>
        <Toaster/>
      </RecoilRoot>
    </>
  );
}

export default App;
