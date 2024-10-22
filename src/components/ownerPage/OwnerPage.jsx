import { useState, useContext, useEffect } from "react";
import { Button} from "react-bootstrap";
import AddNewAppointmensForm from "../addNewAppointmentsForm/AddNewAppointmentsForm";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import OwnerAppointmentsList from "../ownerAppointmentsList/OwnerAppointmentsList";
import OwnerProviderButtonList from "../ownerProviderButtonList/OwnerProviderButtonList";
import './Sidebar.css';

const OwnerPage = () => {

    const [showDateAppointmentForm, setShowDateAppointmentForm] = useState(false);
    const [hypenLastShopApp, setHypenLastShopApp] = useState("");
    const [slashLastShopApp, setSlashLastShopApp] = useState("");
    const [lastAppFlag, setLastAppFlag] = useState(false);
    const [showList, setShowList] = useState(false);
    const [myShopAppointments, setMyShopAppointments] = useState("");
    const [myShopEmployees, setMyShopEmployees] = useState("");
    const [providerAppointments, setProviderAppointments] = useState("");
    const [providerFlag, setProviderFlag] = useState(false);
    const [showProvList, setShowProvList] = useState(false);

    const { token, user } = useContext(AuthenticationContext);

    const changeFlag = () => {
        if (lastAppFlag) {
            setLastAppFlag(false)
        } else {
            setLastAppFlag(true)
        }
    };

    const onClickShowDateAppointmentsForm = () => {
        if (!showDateAppointmentForm) {
            setShowDateAppointmentForm(true);
            setShowList(false);
            setShowProvList(false);
        }
    };

    const onClickOcultDateAppointmentsForm = () => {
        if (showDateAppointmentForm) {
            setShowDateAppointmentForm(false);
        }
    };

    const onClickShowList = () => {
        getMyShopAppointments()
        if (!showList) {
            setShowProvList(false);
            setShowList(true);
            setShowDateAppointmentForm(false);
        }
    };

    const onClickOcultList = () => {
        if (showList) {
            setShowList(false);
        }
    };

    const onClickOcultOtherViews = () => {
        onClickOcultDateAppointmentsForm();
        onClickOcultList();
        //setShowProvList(false);
    };

    const setProviderAppArray = (data) => {
        setProviderAppointments(data);
        setShowProvList(true)
    };

    const onClickShowAppByProvider = () => {
        if (!providerFlag) {
            setProviderFlag(true);
        } else {
            setProviderFlag(false);
        }
    };

    const getMyShopLastAppointment = async () => {
        await fetch(`https://localhost:7276/api/Appointment/GetMyLastShopAppointment`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) return response.json();
            })
            .then((data) => {
                if (data[0] != null) {
                    console.log(`My shop last appointment: ${data[0].dateAndHour}`);
                    const auxDate1 = data[0].dateAndHour.split("T")
                    setHypenLastShopApp(auxDate1[0])
                    const auxDate2 = auxDate1[0].split("-")
                    setSlashLastShopApp(`${auxDate2[2]}/${auxDate2[1]}/${auxDate2[0]}`)
                } else {
                    console.log("No hay turnos almacenados (null)")
                }
            })
            .catch((error) => console.log(error))
    };

    const getMyShopAppointments = async () => {
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
                    throw new Error("The response has some errors");
                }
            })
            .then((data) => {
                console.log(`My shop appointments: ${data}`);
                setMyShopAppointments(data);
            })
            .catch((error) => console.log(error))
    };

    const getMyShopEmployees = async () => {
        await fetch(`https://localhost:7276/api/Employee/GetMyShopEmployees`, {
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
                    throw new Error("The response has some errors");
                }
            })
            .then((data) => {
                console.log(`My shop employees: ${data}`);
                setMyShopEmployees(data);
            })
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        if (user.role == "Owner") {
            getMyShopEmployees();
            getMyShopLastAppointment();
        }
    }, [user, lastAppFlag]);

    return (
      <>
        <div className="d-flex w-100">
        <div className="sidebar">
        <button 
                onClick={onClickShowList}
                className="sidebar-button">
                MOSTRAR TODOS LOS TURNOS
            </button>
            <button 
                onClick={onClickShowAppByProvider}
                className="sidebar-button">
                MOSTRAR TURNOS POR PROVEEDOR
            </button>
            {providerFlag && (
                <OwnerProviderButtonList
                    me={user}
                    myShopEmployees={myShopEmployees}
                    token={token}
                    setProviderAppArray={setProviderAppArray}
                    ocultOtherviews={onClickOcultOtherViews}
                />
            )}
            <button 
                onClick={onClickShowDateAppointmentsForm}
                className="sidebar-button"
            >
                AGREGAR NUEVOS TURNOS
            </button>
        </div>
            <div className="bg-light border rounded m-2 py-4 d-flex justify-content-center align-items-center overflow-auto" style={{height: "85vh", width: "95%"}}>
                {!showDateAppointmentForm && !showList && !showProvList ? <h4>Sección de contenido del dueño</h4> : ""}
                {showDateAppointmentForm ? <AddNewAppointmensForm
                    hypenLastShopApp={hypenLastShopApp}
                    slashLastShopApp={slashLastShopApp}
                    token={token}
                    changeFlag={changeFlag}
                    onClickOccultForm={onClickOcultDateAppointmentsForm}
                    /> : "" }
                {showList ? <OwnerAppointmentsList
                    appointmentsArray={myShopAppointments}
                    employeesArray={myShopEmployees}
                /> : "" }
                {showProvList ? <OwnerAppointmentsList
                    appointmentsArray={providerAppointments}
                    employeesArray={myShopEmployees}
                /> : "" }
            </div>
        </div>
      </>
    );
};
  
export default OwnerPage;