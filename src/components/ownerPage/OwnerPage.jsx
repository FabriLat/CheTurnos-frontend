import { useState, useContext, useEffect } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import AddNewAppointmensForm from "../addNewAppointmentsForm/AddNewAppointmentsForm";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";


const OwnerPage = () => {

    const [showForm, setShowForm] = useState(false)
    const [hypenLastShopApp, setHypenLastShopApp] = useState("");
    const [slashLastShopApp, setSlashLastShopApp] = useState("");
    const { token, user } = useContext(AuthenticationContext);

    const onClickShowForm = () => {
        if (!showForm) {
            setShowForm(true);
        }
    };

    const onClickOcultForm = () => {
        if (showForm) {
            setShowForm(false);
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
                    console.log(data[0].dateAndHour)
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
            getMyShopLastAppointment();
        }
    }, [user])

    return (
      <>
        <Container className="bg-secondary bg-opacity-25 m-2 d-flex justify-content-center align-items-center">
            <h3>Pagína de dueño</h3>
        </Container>
        <Container className="d-flex">
            <Navbar className="bg-secondary m-2 d-flex-column justify-content-start" style={{height: "600px"}}>
                <Button 
                    onClick={onClickShowForm}
                    className="m-3"
                >
                    AGREGAR NUEVOS TURNOS
                </Button>
            </Navbar>
            <Container className="bg-light border m-2 d-flex justify-content-center align-items-center">
                {showForm ? <AddNewAppointmensForm 
                    hypenLastShopApp={hypenLastShopApp}
                    slashLastShopApp={slashLastShopApp}
                    onClickOccultForm={onClickOcultForm}
                    /> : <h4>Sección de contenido</h4>}
            </Container>
        </Container>
      </>
    );
  };
  
  export default OwnerPage;