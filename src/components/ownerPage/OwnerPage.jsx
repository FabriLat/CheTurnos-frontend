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
        console.log(`el token: ${token}`)
        console.log(`el usuario: ${user.role}`)
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
                } else {
                    console.log("la info es null")
                }
            })
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        if (user.role == "Owner") {
            getMyShopLastAppointment()
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
                {showForm ? <AddNewAppointmensForm /> : <h4>Sección de contenido</h4>}
            </Container>
        </Container>
      </>
    );
  };
  
  export default OwnerPage;