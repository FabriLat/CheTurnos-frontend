import { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Spiner from "../spiner/Spiner";

const ServiceForm = () => {
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const durationHoursRef = useRef(null);
    const durationMinutesRef = useRef(null);
    const shopIdRef = useRef(null);
    const navegate = useNavigate();
    const [loading, setLoading] = useState(false);
    

    const [newShopId, setShopId] = useState('0');


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration: {
            hours: "",
            minutes: "",
        },
        shopId: newShopId,
    });

    const [errors, setErrors] = useState({
        name: false,
        description: false,
        price: false,
        duration: false,
        shopId: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDurationChange = (e, field) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            duration: {
                ...prev.duration,
                [name]: value,
            },
        }));
    };

    const registerService = async () => {
        setLoading(true)
        const durationString = `${formData.duration.hours || "00"}:${formData.duration.minutes || "00"}:00`;
        try {
            const response = await fetch("https://localhost:7276/api/Service/Create", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    duration: durationString,
                    shopId: parseInt(formData.shopId, 10),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setLoading(false)
                const errorMessages = Object.values(errorData.errors)
                    .flat()
                    .join(", ");
                throw new Error(`Errores de validación: ${errorMessages}`);
            }

            alert("Servicio registrado exitosamente");
            setLoading(false);
            setFormData({
                name: "",
                description: "",
                price: "",
                duration: { hours: "", minutes: "" },
                shopId: "",
            });

            navegate("/login");

        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        let formIsValid = true;

        if (!formData.name) {
            setErrors((prev) => ({ ...prev, name: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, name: false }));
        }

        if (!formData.description) {
            setErrors((prev) => ({ ...prev, description: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, description: false }));
        }

        if (!formData.price || isNaN(formData.price)) {
            setErrors((prev) => ({ ...prev, price: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, price: false }));
        }

        if (!formData.duration.hours || !formData.duration.minutes) {
            setErrors((prev) => ({ ...prev, duration: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, duration: false }));
        }

        // if (!formData.shopId) {
        //     setErrors((prev) => ({ ...prev, shopId: true }));
        //     formIsValid = false;
        // } else {
        //     setErrors((prev) => ({ ...prev, shopId: false }));
        // }

        if (formIsValid) {
            registerService();
        }
    };

    return (
        <>
            {loading ? (
                <Spiner />
            ) : (
                <div className="service-form-container">
                    <h2>Registrar Servicio</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre del Servicio:</label>
                            <input
                                ref={nameRef}
                                type="text"
                                placeholder="Introduce el nombre del servicio"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? "input-error" : ""}
                            />
                            {errors.name && <div className="alert alert-warning">Completa el campo.</div>}
                        </div>

                        <div className="form-group">
                            <label>Descripción:</label>
                            <input
                                ref={descriptionRef}
                                type="text"
                                placeholder="Introduce la descripción"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className={errors.description ? "input-error" : ""}
                            />
                            {errors.description && <div className="alert alert-warning">Completa el campo.</div>}
                        </div>

                        <div className="form-group">
                            <label>Precio:</label>
                            <input
                                ref={priceRef}
                                type="number"
                                placeholder="Introduce el precio"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={errors.price ? "input-error" : ""}
                            />
                            {errors.price && <div className="alert alert-warning">Completa el campo.</div>}
                        </div>

                        <div className="form-group">
                            <label>Duración:</label>
                            <div className="time-picker">
                                <input
                                    ref={durationHoursRef}
                                    type="number"
                                    placeholder="Horas"
                                    name="hours"
                                    value={formData.duration.hours}
                                    onChange={(e) => handleDurationChange(e, "hours")}
                                    className={errors.duration ? "input-error" : ""}
                                />
                                <input
                                    ref={durationMinutesRef}
                                    type="number"
                                    placeholder="Minutos"
                                    name="minutes"
                                    value={formData.duration.minutes}
                                    onChange={(e) => handleDurationChange(e, "minutes")}
                                    className={errors.duration ? "input-error" : ""}
                                />
                            </div>
                            {errors.duration && <div className="alert alert-warning">Completa el campo.</div>}
                        </div>

                        {/* <div className="form-group">
                    <label>ID de la Tienda:</label>
                    <input
                        ref={shopIdRef}
                        type="number"
                        placeholder="Introduce el ID de la tienda"
                        name="shopId"
                        value={formData.shopId}
                        onChange={handleChange}
                        className={errors.shopId ? "input-error" : ""}
                    />
                    {errors.shopId && <div className="alert alert-warning">Completa el campo.</div>}
                </div> */}

                        <button type="submit" className="register-button">
                            Registrar Servicio
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default ServiceForm;
