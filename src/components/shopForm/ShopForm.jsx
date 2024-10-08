import { useState, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import UserNav from "../userNav/UserNav";

const daysOfWeek = [
    { value: 1, label: "Lunes" },
    { value: 2, label: "Martes" },
    { value: 3, label: "Miércoles" },
    { value: 4, label: "Jueves" },
    { value: 5, label: "Viernes" },
    { value: 6, label: "Sábado" },
    { value: 0, label: "Domingo" },
];

const ShopForm = () => {
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const typeRef = useRef(null);
    const appointmentFrequencyRef = useRef(null);
    const timeStartHourRef = useRef(null);
    const timeStartMinRef = useRef(null);
    const timeEndHourRef = useRef(null);
    const timeEndMinRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        type: "",
        isPremium: false,
        appointmentFrequency: "",
        timeStart: { hours: "", minutes: "" },
        timeEnd: { hours: "", minutes: "" },
        workDays: [],
    });

    const [errors, setErrors] = useState({
        name: true,
        address: true,
        phone: true,
        email: true,
        type: true,
        appointmentFrequency: true,
        timeStart: true,
        timeEnd: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleWorkDaysChange = (day) => {
        setFormData((prev) => {
            const workDays = prev.workDays.includes(day)
                ? prev.workDays.filter((d) => d !== day)
                : [...prev.workDays, day];
            return { ...prev, workDays };
        });
    };

    const registerShop = async () => {
        try {
            const response = await fetch("https://localhost:7276/api/Shop/Create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    type: parseInt(formData.type, 10),
                    address: formData.address,
                    phone: formData.phone,
                    email: formData.email,
                    isPremium: formData.isPremium,
                    appoimentFrecuence: parseInt(formData.appointmentFrequency, 10),
                    timeStart: `${formData.timeStart.hours}:${formData.timeStart.minutes}:00`,
                    timeEnd: `${formData.timeEnd.hours}:${formData.timeEnd.minutes}:00`,
                    workDays: formData.workDays,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Datos del error:", errorData.errors);
                const errorMessages = Object.values(errorData.errors)
                    .flat()
                    .join(", ");
                throw new Error(`Errores de validación: ${errorMessages}`);
            }

            const data = await response.json();
            console.log("Tienda registrada:", data);
            alert("Tienda registrada exitosamente");

        } catch (error) {
            console.error("Error al registrar la tienda:", error);
            alert(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const address = addressRef.current.value;
        const phone = phoneRef.current.value;
        const email = emailRef.current.value;
        const type = typeRef.current.value;
        const appointmentFrequency = appointmentFrequencyRef.current.value;
        const timeStartHours = timeStartHourRef.current.value;
        const timeStartMinutes = timeStartMinRef.current.value;
        const timeEndHours = timeEndHourRef.current.value;
        const timeEndMinutes = timeEndMinRef.current.value;

        let formIsValid = true;

        if (!name) {
            setErrors((prev) => ({ ...prev, name: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, name: false }));
        }

        if (!address) {
            setErrors((prev) => ({ ...prev, address: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, address: false }));
        }

        if (!phone) {
            setErrors((prev) => ({ ...prev, phone: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, phone: false }));
        }

        if (!email) {
            setErrors((prev) => ({ ...prev, email: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, email: false }));
        }

        if (!type) {
            setErrors((prev) => ({ ...prev, type: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, type: false }));
        }

        if (!appointmentFrequency || isNaN(appointmentFrequency)) {
            setErrors((prev) => ({ ...prev, appointmentFrequency: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, appointmentFrequency: false }));
        }

        if (!timeStartHours || !timeStartMinutes) {
            setErrors((prev) => ({ ...prev, timeStart: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, timeStart: false }));
        }

        if (!timeEndHours || !timeEndMinutes) {
            setErrors((prev) => ({ ...prev, timeEnd: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, timeEnd: false }));
        }

        if (formIsValid) {
            registerShop();
        }
    };

    return (
        <>
            <UserNav />
            <Container className="mt-4">
                <h2>Registro de Tienda</h2>
                <Form className="mt-5" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre de la Tienda</Form.Label>
                        <Form.Control
                            ref={nameRef}
                            type="text"
                            placeholder="Introduce el nombre de la tienda"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="text-danger">Completa el campo.</span>}
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            ref={addressRef}
                            type="text"
                            placeholder="Introduce la dirección"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <span className="text-danger">Completa el campo.</span>}
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            ref={phoneRef}
                            type="text"
                            placeholder="Introduce el teléfono"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <span className="text-danger">Completa el campo.</span>}
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            ref={emailRef}
                            type="email"
                            placeholder="Introduce tu correo electrónico"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="text-danger">Completa el campo.</span>}
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Label>Tipo de Tienda</Form.Label>
                        <Form.Control
                            ref={typeRef}
                            as="select"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un tipo</option>
                            <option value="0">Retail</option>
                            <option value="1">Service</option>
                            {/* Nose si faltan agregar tipos */}
                        </Form.Control>
                        {errors.type && <span className="text-danger">Completa el campo.</span>}
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Label>Frecuencia de Cita (minutos)</Form.Label>
                        <Form.Control
                            ref={appointmentFrequencyRef}
                            type="number"
                            placeholder="Frecuencia de citas"
                            name="appointmentFrequency"
                            value={formData.appointmentFrequency}
                            onChange={handleChange}
                        />
                        {errors.appointmentFrequency && <span className="text-danger">Completa el campo.</span>}
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Label>Hora de Inicio</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                ref={timeStartHourRef}
                                type="number"
                                placeholder="HH"
                                name="timeStart-hours"
                                min="0"
                                max="23"
                                style={{ width: "70px", marginRight: "10px" }}
                                onChange={(e) => {
                                    handleChange({
                                        target: {
                                            name: "timeStart",
                                            value: { ...formData.timeStart, hours: e.target.value }
                                        }
                                    });
                                }}
                            />
                            <Form.Control
                                ref={timeStartMinRef}
                                type="number"
                                placeholder="MM"
                                name="timeStart-minutes"
                                min="0"
                                max="59"
                                style={{ width: "70px" }}
                                onChange={(e) => {
                                    handleChange({
                                        target: {
                                            name: "timeStart",
                                            value: { ...formData.timeStart, minutes: e.target.value }
                                        }
                                    });
                                }}
                            />
                        </div>
                        {errors.timeStart && <span className="text-danger">Completa el campo.</span>}
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Label>Hora de Fin</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                ref={timeEndHourRef}
                                type="number"
                                placeholder="HH"
                                name="timeEnd-hours"
                                min="0"
                                max="23"
                                style={{ width: "70px", marginRight: "10px" }}
                                onChange={(e) => {
                                    handleChange({
                                        target: {
                                            name: "timeEnd",
                                            value: { ...formData.timeEnd, hours: e.target.value }
                                        }
                                    });
                                }}
                            />
                            <Form.Control
                                ref={timeEndMinRef}
                                type="number"
                                placeholder="MM"
                                name="timeEnd-minutes"
                                min="0"
                                max="59"
                                style={{ width: "70px" }}
                                onChange={(e) => {
                                    handleChange({
                                        target: {
                                            name: "timeEnd",
                                            value: { ...formData.timeEnd, minutes: e.target.value }
                                        }
                                    });
                                }}
                            />
                        </div>
                        {errors.timeEnd && <span className="text-danger">Completa el campo.</span>}
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Label>Días de Trabajo</Form.Label>
                        {daysOfWeek.map((day) => (
                            <Form.Check
                                key={day.value}
                                type="checkbox"
                                label={day.label}
                                checked={formData.workDays.includes(day.value)}
                                onChange={() => handleWorkDaysChange(day.value)}
                            />
                        ))}
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-4">
                        Registrar Tienda
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default ShopForm;
