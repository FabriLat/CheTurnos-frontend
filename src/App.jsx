import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import { AuthenticationContextProvider } from "./services/authentication/AuthenticationContext";

function App() {
  const router = createBrowserRouter([{ path: "/login", element: <Login /> }]);

  return (
    <>
      <AuthenticationContextProvider>
        <RouterProvider router={router} />
      </AuthenticationContextProvider>
    </>
  );
}

export default App;
