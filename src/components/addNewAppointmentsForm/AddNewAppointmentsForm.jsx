import { useState, useRef, useEffect } from "react";
import { Card, Row, Form, Button, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const AddNewAppointmensForm = ({ hypenLastShopApp, slashLastShopApp, token, changeFlag, onClickOccultForm }) => {
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [errors, setErrors] = useState({
        dateStart: false,
        dateEnd: false,
        dateOrder: false,
        datePast: false,
        dateOverlap: false,
    });
    const [errorMessagge, setErrorMessagge] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [responseMessagge, setResponseMessagge] = useState("")
    const [styleMessagge, setStyleMessagge] = useState("")

    const dateStartRef = useRef(null);
    const dateEndRef = useRef(null);

    const showModalHandler = () => {
        if (showModal) {
            setShowModal(false)
            setStyleMessagge("")
            setResponseMessagge("")
            setDateStart("");
            setDateEnd("");
            setErrorMessagge("");
            onClickOccultForm()
        } else {
            setShowModal(true)
        }
    };

    const onChangeDateStart = (event) => {
        setErrors({ ...errors, dateStart: false, dateOrder: false, datePast: false, dateOverlap: false });
        const inputDateStart = event.target.value;
        setDateStart(inputDateStart);
        setErrorMessagge("")
    };

    const onChangeDateEnd = (event) => {
        setErrors({ ...errors, dateEnd: false, dateOrder: false, datePast: false, dateOverlap: false });
        const inputDateEnd = event.target.value;
        setDateEnd(inputDateEnd);
        setErrorMessagge("")
    };

    const validateInputDates = (start, end, lastAppDate) => {
        const day1 = new Date(`${start}T00:00:00`);
        const day2 = new Date(`${end}T00:00:00`);
        const auxDay = new Date().toLocaleDateString();
        const splitAuxDay = auxDay.split("/");
        const today = new Date(`${splitAuxDay[2]}-${splitAuxDay[1]}-${splitAuxDay[0]}T00:00:00`);

        if (day1 > day2) {
            setErrors({ ...errors, dateOrder: true });
            return false;
        }

        if (day1 < today) {
            setErrors({ ...errors, datePast: true });
            return false;
        }

        if (lastAppDate != "") {
            const auxLastAppDate = new Date(`${lastAppDate}T00:00:00`)
            if (day1 <= auxLastAppDate) {
                setErrors({ ...errors, dateOverlap: true });
                return false;
            }
        }

        return true;
    };

    const assignErrorMessagge = () => {
        if (errors.dateOrder) {
            setErrorMessagge("La fecha de fin no puede ser menor a la fecha de inicio")
        }

        if (errors.datePast) {
            setErrorMessagge("La fecha de inicio no puede ser menor a la fecha de hoy")
        }

        if (errors.dateOverlap) {
            setErrorMessagge("La fecha de inicio debe ser mayor a la fecha del último turno almacenado")
        }
    };

    useEffect(() => {
        if (errors.dateOrder || errors.datePast || errors.dateOverlap) {
            assignErrorMessagge();
        }
    }, [errors])

    const sendStartAndEndDate = async (objToSend) => {
        await fetch(`https://localhost:7276/api/Owner/AddNewAppointments`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(objToSend)
        })
            .then((response) => {
                if (response.ok) {
                    setStyleMessagge("text-success")
                    setResponseMessagge("Operación exitosa!")
                    changeFlag()
                    showModalHandler()
                } else {
                    throw new Error("The response has some errors");
                }
            })
            .then((data) => console.log(data))
            .catch((error) => {
                console.log(error)
                setStyleMessagge("text-danger")
                setResponseMessagge("Error de conectividad!")
                showModalHandler()
            })
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (dateStartRef.current.value.length === 0) {
            dateStartRef.current.focus();
            setErrors({ ...errors, dateStart: true });
            return;
        }
      
        if (dateEndRef.current.value.length === 0) {
            dateEndRef.current.focus();
            setErrors({ ...errors, dateEnd: true });
            return;
        }

        if (validateInputDates(dateStart, dateEnd, hypenLastShopApp)) {
            
            const dateRange = {
                "dateStart": dateStart,
                "dateEnd": dateEnd
            }

            sendStartAndEndDate(dateRange);
        }

        setDateStart("");
        setDateEnd("");
        setErrorMessagge("");
    };

    return (
        <>
            <Card className="m-auto bg-secondary bg-opacity-25" style={{ width: "50%" }}>
                <Card.Body>
                    <Row className="mb-2 text-info">
                        {hypenLastShopApp ? <h4>(Nota: fecha del último turno {slashLastShopApp})</h4> : <h4>(Nota: no hay turnos previos almacenados)</h4>}
                    </Row>
                    <Row className="mb-4">
                        <h4>Introduzca el rango de fechas en el que creará los nuevos turnos: </h4>
                    </Row>
                    <Form className="d-flex-column" onSubmit={onSubmitHandler}>
                        <Form.Group className="d-flex justify-content-center m-2 gap-2">
                            <Form.Label className="my-2"><h5>Fecha desde:</h5></Form.Label>
                            <Form.Control className={errors.dateStart ? "w-50 focus-ring focus-ring-danger border border-danger" : "w-50"}
                                type="date"
                                ref={dateStartRef}
                                name="dateStart"
                                value={dateStart}
                                onChange={onChangeDateStart}
                            />
                        </Form.Group>
                        {errors.dateStart ? (
                            <p className="mt-1 text-danger">Debe especificar una fecha de inicio</p>
                            ) : (
                                ""
                            )}
                        <Form.Group className="d-flex justify-content-center m-2 gap-2">
                            <Form.Label className="ms-1 my-2"><h5>Fecha hasta:</h5></Form.Label>
                            <Form.Control className={errors.dateEnd ? "w-50 focus-ring focus-ring-danger border border-danger" : "w-50"}
                                type="date"
                                ref={dateEndRef}
                                name="dateEnd"
                                value={dateEnd}
                                onChange={onChangeDateEnd}
                            />
                        </Form.Group>
                        {errors.dateEnd ? (
                            <p className="mt-1 text-danger">Debe especificar una fecha de fin</p>
                            ) : (
                                ""
                            )}
                        <Row>
                            {errorMessagge ? <p className="mt-3 text-danger">{errorMessagge}</p> : ""}
                        </Row>
                        <Row className="d-flex justify-content-center">
                            <Button className="w-25 mx-2 mt-3" variant="danger" onClick={onClickOccultForm}>
                                VOLVER
                            </Button>
                            <Button className="w-25 mx-2 mt-3" type="submit">
                                CONFIRMAR
                            </Button>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={showModalHandler} centered>
                <Modal.Body>
                    <h3 className={styleMessagge}>{responseMessagge}</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showModalHandler}>
                        CERRAR
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    );
  };
  
  export default AddNewAppointmensForm;