import { useState, useRef, useEffect } from "react";
import '../shopForm/shopForm.css';
import { useNavigate } from "react-router-dom";
import Spiner from "../spiner/Spiner";


const OwnerForm = () => {
    const [newShopId, setShopId] = useState('0');

    const nameRef = useRef(null);
    const shopIdRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const imgUrlRef = useRef(null);
    const confirmPassRef = useRef(null);
    const navegate = useNavigate();
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        shopId: newShopId,
        email: "",
        password: "",
        imgUrl: "none",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: false,
        //shopId: false,
        email: false,
        password: false,
        //imgUrl: false,
        confirmPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const registerOwner = async () => {
        setLoading(true)
        try {
            const response = await fetch("https://localhost:7276/api/Owner/CreateNewOwner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setLoading(false)
                const errorMessages = Object.values(errorData.errors)
                    .flat()
                    .join(", ");
                throw new Error(`Errores de validación: ${errorMessages}`);
            }

            alert("Registro exitoso");
            setLoading(false);
            navegate("/ServiceForm");
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

        // if (!formData.shopId) {
        //     setErrors((prev) => ({ ...prev, shopId: true }));
        //     formIsValid = false;
        // } else {
        //     setErrors((prev) => ({ ...prev, shopId: false }));
        // }

        if (!formData.email) {
            setErrors((prev) => ({ ...prev, email: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, email: false }));
        }

        if (!formData.password) {
            setErrors((prev) => ({ ...prev, password: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, password: false }));
        }

        if (!formData.confirmPassword || formData.password !== formData.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, confirmPassword: false }));
        }

        // if (!formData.imgUrl) {
        //     setErrors((prev) => ({ ...prev, imgUrl: true }));
        //     formIsValid = false;
        // } else {
        //     setErrors((prev) => ({ ...prev, imgUrl: false }));
        // }

        if (formIsValid) {
            registerOwner();
        }
    };

    return (
        <>
            {loading ? (
                <Spiner />
            ) : (
                <div className="outer-container-shop-register">
                    <form onSubmit={handleSubmit} className="registerShop">
                        <h2>Registrar Propietario</h2>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                ref={nameRef}
                                type="text"
                                placeholder="Introduce el nombre del dueño"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? "input-error" : ""}
                            />
                            {errors.name && <div className="alert alert-warning">Completa este campo.</div>}
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
                    {errors.shopId && <div className="alert alert-warning">Completa este campo.</div>}
                </div> */}

                        <div className="form-group">
                            <label>Correo Electrónico:</label>
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder="Introduce el correo electrónico"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? "input-error" : ""}
                            />
                            {errors.email && <div className="alert alert-warning">Completa este campo.</div>}
                        </div>

                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="Introduce la contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? "input-error" : ""}
                            />
                            {errors.password && <div className="alert alert-warning">Completa este campo.</div>}
                        </div>

                        <div className="form-group">
                            <label>Confirmar Contraseña:</label>
                            <input
                                ref={confirmPassRef}
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirma tu contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? "input-error" : ""}
                            />
                            {errors.confirmPassword && <div className="alert alert-warning">Las contraseñas no coinciden..</div>}
                        </div>


                        {/* <div className="form-group">
                            <label>URL de la Imagen:</label>
                            <input
                                ref={imgUrlRef}
                                type="text"
                                placeholder="Introduce la URL de la imagen"
                                name="imgUrl"
                                value={formData.imgUrl}
                                onChange={handleChange}
                                className={errors.imgUrl ? "input-error" : ""}
                            />
                            {errors.imgUrl && <div className="alert alert-warning">Completa este campo.</div>}
                        </div> */}

                        <button type="submit" className="register-button">Registrar Propietario</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default OwnerForm;
