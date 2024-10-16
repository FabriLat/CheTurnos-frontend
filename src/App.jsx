import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ShopList from "./components/shopList/ShopList";
import ShopForm from "./components/shopForm/ShopForm";

import { AuthenticationContextProvider } from "./services/authentication/AuthenticationContext";
import Homepage from "./components/homepage/Homepage";

import ServiceList from "./components/serviceList/ServiceList";
import EmployeeList from "./components/employeeList/EmployeeList";
import AppointmentsList from "./components/appointmentsList/AppointmentsList";
import PassResetForm from "./components/passResetForm/PassResetForm";
import OwnerPage from "./components/ownerPage/OwnerPage";


function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/PassResetForm", element: <PassResetForm /> },
    { path: "/shopList", element: <ShopList /> },
    { path: "/serviceList", element: <ServiceList /> },
    { path: "/employeeList", element:<EmployeeList/>},
    { path: "/shopForm", element: <ShopForm /> },
    { path: "/ownerPage", element: <OwnerPage /> },
    { path: "/AppointmentList", element: <AppointmentsList/>},
  ]);

  return (
    <AuthenticationContextProvider>
      <RouterProvider router={router} />
    </AuthenticationContextProvider>
  );
}

export default App;
