import { useState, useContext, createContext } from "react";
import { AuthenticationContext } from "../authentication/AuthenticationContext";

export const ShopContext = createContext({});

const userValueString = localStorage.getItem("userData");
const userValue = userValueString ? JSON.parse(userValueString) : null;

export const ShopContextProvider = ({ children }) => {

    //my shop global states section
    const [myShopAppointments, setMyShopAppointments] = useState("");
    
    const [hypenLastShopApp, setHypenLastShopApp] = useState(""); //las appointment date of my shop with "-"
    const [slashLastShopApp, setSlashLastShopApp] = useState(""); //las appointment date of my shop with "/"

    const [myShopEmployees, setMyShopEmployees] = useState("");
    const [myShopData, setMyShopData] = useState("");

    //flags for requests section
    const [appFlag, setAppFlag] = useState(true);
    const [lastAppFlag, setLastAppFlag] = useState(true);
    const [empFlag, setEmpFlag] = useState(true);
    const [dataFlag, setDataFlag] = useState(false);

    //other context states
    const { user, token } = useContext(AuthenticationContext);

    //normal function section
    const reqEmpHandler = () => {
        if (empFlag) {
            getMyShopEmployees();
        }
    };

    const reqAppHandler = () => {
        if (appFlag) {
            getMyShopAppointments();
        }
    };

    const reqLastAppHandler = () => {
        if (lastAppFlag) {
            getMyShopLastAppointment();
        }
    };

    const reqShopDataHandler = () => {
        //fetch aquí
    };

    const deleteAppHandler = (newArray) => {
        setMyShopAppointments(newArray);
    };

    //request functions section
    const getMyShopLastAppointment = async () => {
        await fetch(`https://localhost:7276/api/Appointment/GetMyLastShopAppointment`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    // Manejo de errores según el código de estado
                    if (response.status === 404) {
                        throw new Error('Not Found (404)');
                    } else if (response.status === 401) {
                        throw new Error('Unauthorized (401)');
                    } else {
                        throw new Error('Error: ' + response.status);
                    }
                }
            })
            .then((data) => {
                // Procesar los datos aquí
                console.log(data)
                console.log(`My shop last appointment: ${data.dateAndHour}`);
                const auxDate1 = data.dateAndHour.split("T")
                setHypenLastShopApp(auxDate1[0])
                const auxDate2 = auxDate1[0].split("-")
                setSlashLastShopApp(`${auxDate2[2]}/${auxDate2[1]}/${auxDate2[0]}`)
                setLastAppFlag(false);
            })
            .catch((error) => {
                // Manejo del error aquí
                console.log(error)
            })
    };

    const getMyShopAppointments = async () => { //devuevle nombres de proveedores, clientes, y servicios//

        await fetch(`https://localhost:7276/api/Appointment/GetAllApointmentsOfMyShop`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    // Manejo de errores según el código de estado
                    if (response.status === 404) {
                        throw new Error('Not Found (404)');
                    } else if (response.status === 401) {
                        throw new Error('Unauthorized (401)');
                    } else {
                        throw new Error(`Error: ${response.status}`);
                    }
                }
            })
            .then((data) => {
                // Procesar los datos aquí
                console.log(`My shop appointments: ${data}`);
                setMyShopAppointments(data);
                setAppFlag(false);
            })
            .catch((error) => {
                // Manejo del error aquí
                console.log(error)
            })
    };

    const getMyShopEmployees = async () => {

        await fetch(`https://localhost:7276/api/Employee/GetMyShopEmployees/${user.id}`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                mode: "cors",
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        // Manejo de errores según el código de estado
                        if (response.status === 404) {
                            throw new Error('Not Found (404)');
                        } else if (response.status === 401) {
                            throw new Error('Unauthorized (401)');
                        } else {
                            throw new Error(`Error: ${response.status}`);
                        }
                    }
                })
                .then((data) => {
                    // Procesar los datos aquí
                    console.log(data);
                    setMyShopEmployees(data);
                    setEmpFlag(false);
                    console.log(`My shop employees: ${data}`);
                })
                .catch((error) => {
                    // Manejo del error aquí
                    console.log(error)
                })
    };

    return (
        <ShopContext.Provider
            value={{
                myShopAppointments,
                myShopEmployees,
                hypenLastShopApp,
                slashLastShopApp,
                reqEmpHandler,
                reqAppHandler,
                reqLastAppHandler,
                deleteAppHandler,
                setAppFlag,
                setEmpFlag,
                setLastAppFlag
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};
