import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ShopList from "./components/shopList/ShopList";
import ShopForm from "./components/shopForm/ShopForm";

import { AuthenticationContextProvider } from "./services/authentication/AuthenticationContext";
import { ShopContextProvider } from "./services/shop/ShopContext";
import Homepage from "./components/homepage/Homepage";

import ServiceList from "./components/serviceList/ServiceList";
import EmployeeList from "./components/employeeList/EmployeeList";
import AppointmentsList from "./components/appointmentsList/AppointmentsList";
import PassResetForm from "./components/passResetForm/PassResetForm";
import OwnerPage from "./components/ownerPage/OwnerPage";
import MainLayout from "./components/mainLayout/MainLayout";
import NotFound from "./routes/NotFound";
import OwnerAppointmentsList from "./components/ownerAppointmentsList/OwnerAppointmentsList";
import ClientsAppointmentList from "./components/clientsAppointmentList/ClientsAppointmentList";
import OwnersEmployeeList from "./components/ownersEmployeeList/OwnersEmployeeList";
import OwnersEmployeeRegister from "./components/ownersEmployeeRegister/ownersEmployeeRegister";
import Users from "./components/users/Users";
import RegisterScreen from "./components/registerScreen/RegisterScreen";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <Homepage />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <MainLayout>
          <Login />
        </MainLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <MainLayout>
          <Register />
        </MainLayout>
      ),
    },
    {
      path: "/registerScreen",
      element: (
        <MainLayout>
          <RegisterScreen />
        </MainLayout>
      ),
    },
    {
      path: "/PassResetForm",
      element: (
        <MainLayout>
          <PassResetForm />
        </MainLayout>
      ),
    },
    {
      path: "/shopList",
      element: (
        <MainLayout>
          <ShopList />
        </MainLayout>
      ),
    },
    {
      path: "/serviceList",
      element: (
        <MainLayout>
          <ServiceList />
        </MainLayout>
      ),
    },
    {
      path: "/employeeList",
      element: (
        <MainLayout>
          <EmployeeList />
        </MainLayout>
      ),
    },
    {
      path: "/shopForm",
      element: (
        <MainLayout>
          <ShopForm />
        </MainLayout>
      ),
    },
    {
      path: "/ownerPage",
      element: (
        <MainLayout>
          <OwnerPage />
        </MainLayout>
      ),
    },
    {
      path: "/OwnerEmployeeAppointments",
      element: (
        <MainLayout>
          <OwnerAppointmentsList/>
        </MainLayout>
      ),
    },
    {
      path: "/ClientAppointmentsList",
      element: (
        <MainLayout>
          <ClientsAppointmentList/>
        </MainLayout>
      ),
    },
    {
      path: "/OwnersEmployeeList",
      element: (
        <MainLayout>
          <OwnersEmployeeList/>
        </MainLayout>
      ),
    },
    {
      path: "/OwnersEmployeeRegister",
      element: (
        <MainLayout>
          <OwnersEmployeeRegister/>
        </MainLayout>
      ),
    },
    {
      path: "/*",
      element: (
        <NotFound />
      ),
    },
    {
      path: "/appointmentList",
      element: (
        <MainLayout>
          <AppointmentsList />
        </MainLayout>
      ),
    },
    {
      path: "/Users",
      element: (
        <MainLayout>
          <Users/>
        </MainLayout>
      ),
    },
    
  ]);

  return (
    <AuthenticationContextProvider>
      <ShopContextProvider>
        <RouterProvider router={router} />
      </ShopContextProvider>
    </AuthenticationContextProvider>
  );
}

export default App;
