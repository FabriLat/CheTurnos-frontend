import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ShopList from "./components/shopList/ShopList";
import ShopForm from "./components/shopForm/ShopForm";

import { AuthenticationContextProvider } from "./services/authentication/AuthenticationContext";
import ServiceList from "./components/serviceList/ServiceList";
import EmployeeList from "./components/employeeList/EmployeeList";
import AppointmentsList from "./components/appointmentsList/AppointmentsList";

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/shopList", element: <ShopList /> },
    { path: "/serviceList", element: <ServiceList /> },
    { path: "/employeeList", element:<EmployeeList/>},
    { path: "/shopForm", element: <ShopForm /> },
    { path: "/AppointmentList", element: <AppointmentsList/>},
  ]);

  return (
    <AuthenticationContextProvider>
      <RouterProvider router={router} />
    </AuthenticationContextProvider>
  );
}

export default App;
