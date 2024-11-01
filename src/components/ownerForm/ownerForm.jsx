import { useState, useRef } from "react";
import './ownerForm.css';

const OwnerForm = () => {
    const nameRef = useRef(null);
    const shopIdRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const imgUrlRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        shopId: "",
        email: "",
        password: "",
        imgUrl: "",
    });

    const [errors, setErrors] = useState({
        name: false,
        shopId: false,
        email: false,
        password: false,
        imgUrl: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const registerOwner = async () => {
        try {
            const response = await fetch("https://localhost:7276/api/Owner/Create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessages = Object.values(errorData.errors)
                    .flat()
                    .join(", ");
                throw new Error(`Errores de validación: ${errorMessages}`);
            }

            alert("Registro exitoso");
        } catch (error) {
            alert(error.message);
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

        if (!formData.shopId) {
            setErrors((prev) => ({ ...prev, shopId: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, shopId: false }));
        }

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

        if (!formData.imgUrl) {
            setErrors((prev) => ({ ...prev, imgUrl: true }));
            formIsValid = false;
        } else {
            setErrors((prev) => ({ ...prev, imgUrl: false }));
        }

        if (formIsValid) {
            registerOwner();
        }
    };

    return (
        <div className="owner-form-container">
            <h2>Registrar Propietario</h2>
            <form onSubmit={handleSubmit}>
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

                <div className="form-group">
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
                </div>

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
                </div>

                <button type="submit" className="register-button">Registrar Propietario</button>
            </form>
        </div>
    );
};

export default OwnerForm;