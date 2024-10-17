import { useState, useContext, useEffect } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import AddNewAppointmensForm from "../addNewAppointmentsForm/AddNewAppointmentsForm";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import OwnerAppointmentsList from "../ownerAppointmentsList/OwnerAppointmentsList";


const OwnerPage = () => {

    const [showForm, setShowForm] = useState(false)
    const [hypenLastShopApp, setHypenLastShopApp] = useState("");
    const [slashLastShopApp, setSlashLastShopApp] = useState("");
    const [lastAppFlag, setLastAppFlag] = useState(false);
    const [showList, setShowList] = useState(false);
    const [myShopAppointments, setMyShopAppointments] = useState("");
    const [myShopEmployees, setMyShopEmployees] = useState("");

    const { token, user } = useContext(AuthenticationContext);

    const changeFlag = () => {
        if (lastAppFlag) {
            setLastAppFlag(false)
        } else {
            setLastAppFlag(true)
        }
    };

    const onClickShowForm = () => {
        if (!showForm) {
            setShowForm(true);
            setShowList(false);
        }
    };

    const onClickOcultForm = () => {
        if (showForm) {
            setShowForm(false);
        }
    };

    const onClickShowList = () => {
        getMyShopAppointments()
        if (!showList) {
            setShowList(true);
            setShowForm(false);
        }
    };

    const onClickOcultList = () => {
        if (showList) {
            setShowList(false);
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

    useEffect(() => {
        if (user.role == "Owner") {
            getMyShopEmployees();
            getMyShopLastAppointment();
        }
    }, [user, lastAppFlag])

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

    return (
      <>
        <div className="bg-secondary bg-opacity-25 m-2 p-3 d-flex justify-content-center align-items-center rounded">
            <h3>Pagína de dueño</h3>
        </div>
        <div className="d-flex w-100">
            <div className="bg-secondary m-2 rounded" style={{height: "85vh", width: "15%"}}>
                <Button 
                    onClick={onClickShowList}
                    className="mx-3 mt-3">
                    MOSTRAR TODOS LOS TURNOS
                </Button>
                <Button 
                    onClick={onClickShowForm}
                    className="mx-3 mt-3"
                >
                    AGREGAR NUEVOS TURNOS
                </Button>
            </div>
            <div className="bg-light border rounded m-2 py-4 d-flex justify-content-center align-items-center overflow-auto" style={{height: "85vh", width: "95%"}}>
                {!showForm && !showList ? <h4>Sección de contenido del dueño</h4> : ""}
                {showForm ? <AddNewAppointmensForm
                    hypenLastShopApp={hypenLastShopApp}
                    slashLastShopApp={slashLastShopApp}
                    token={token}
                    changeFlag={changeFlag}
                    onClickOccultForm={onClickOcultForm}
                    /> : "" }
                {showList ? <OwnerAppointmentsList
                    appointmentsArray={myShopAppointments}
                    employeesArray={myShopEmployees}
                /> : "" }
            </div>
        </div>
      </>
    );
  };
  
  export default OwnerPage;