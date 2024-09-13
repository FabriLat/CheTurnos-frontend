import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import { AuthenticationContextProvider } from "./services/authentication/AuthenticationContext";
import Register from "./components/register/Register";

function App() {
  const router = createBrowserRouter([{ path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> }
  ]);

  return (
    <>
      <AuthenticationContextProvider>
        <RouterProvider router={router} />
      </AuthenticationContextProvider>
    </>
  );
}

export default App;
