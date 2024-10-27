import { useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
const useValidateUser = () => {
    const { user } = useContext(AuthenticationContext);
    const isAdmin = () => user?.role === 'SysAdmin';
    const isOwner = () => user?.role === 'Owner';
    const isEmployee = () => user?.role === "Employee";
    const isClient = () => user?.role === "Client";
    return {
        isAdmin,
        isOwner,
        isEmployee,
        isClient
    }
};

export default useValidateUser;