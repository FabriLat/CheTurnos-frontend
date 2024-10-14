import { useState, useContext, useEffect } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import AddNewAppointmensForm from "../addNewAppointmentsForm/AddNewAppointmentsForm";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";


const OwnerPage = () => {

    const [showForm, setShowForm] = useState(false)
    const [lastShopAppointment, setLastShopAppointment] = useState("");
    const { token, user } = useContext(AuthenticationContext);

    const onClickAddNewAppHandler = () => {
        if (showForm) {
            setShowForm(false);
        } else {
            setShowForm(true);
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
                    console.log(data)
                    setLastShopAppointment(data[0])
                } else {
                    console.log("No hay turnos almacenados (null)")
                }
            })
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        if (user.role == "Owner") {
            getMyShopLastAppointment();

            if (lastShopAppointment != "") {
                //lógica
            }
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
                    onClick={onClickAddNewAppHandler}
                    className="m-3"
                >
                    AGREGAR NUEVOS TURNOS
                </Button>
            </Navbar>
            <Container className="bg-light border m-2 d-flex justify-content-center align-items-center">
                {showForm ? <AddNewAppointmensForm value={lastShopAppointment}/> : <h4>Sección de contenido</h4>}
            </Container>
        </Container>
      </>
    );
  };
  
  export default OwnerPage;