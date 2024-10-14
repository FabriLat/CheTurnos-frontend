import { useState, useRef } from "react";
import { Card, Row, Form, Button } from "react-bootstrap";

const AddNewAppointmensForm = ({ lastShopAppointment }) => {
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [errors, setErrors] = useState({
        dateStart: false,
        dateEnd: false,
    });

    const dateStartRef = useRef(null);
    const dateEndRef = useRef(null);

    const onChangeDateStart = (event) => {
        setErrors({ ...errors, dateStart: false });
        const inputDateStart = event.target.value;
        setDateStart(inputDateStart);
    };

    const onChangeDateEnd = (event) => {
        setErrors({ ...errors, dateEnd: false });
        const inputDateEnd = event.target.value;
        setDateEnd(inputDateEnd);
    };

    const validateInputDates = (start, end, lastAppDate) => {
        const day1 = new Date(`${start}T00:00:00`);
        const day2 = new Date(`${end}T00:00:00`);
        const auxDay = new Date().toLocaleDateString();
        const splitAuxDay = auxDay.split("/");
        const today = new Date(`${splitAuxDay[2]}-${splitAuxDay[1]}-${splitAuxDay[0]}T00:00:00`);


        if (day1 > day2) {
            return false;
        }

        if (day1 < today) {
            return false;
        }

        if (lastAppDate != "") {
            
        }

        return true;
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

        getLastAppointment(1);

        //if (validateInputDates(dateStart, dateEnd, lastAppointment)) {
            //fetch
        //}
        
        setDateStart("");
        setDateEnd("");
    };

    return (
        <Card className="w-50 m-auto bg-secondary bg-opacity-25">
            <Card.Body>
                <Row className="mb-2 text-info">
                    {lastShopAppointment ? <h4>(Nota: fecha del último turno {lastShopAppointment})</h4> : <h4>(Nota: no hay turnos previos almacenados)</h4>}
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
                        <Button className="w-50 mx-auto mt-4" type="submit">
                            CONFIRMAR
                        </Button>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
  };
  
  export default AddNewAppointmensForm;