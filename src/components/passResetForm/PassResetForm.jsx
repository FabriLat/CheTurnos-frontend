import { useRef, useState } from 'react';
import Spiner from '../spiner/Spiner';
import './passResetForm.css'

const PassResetForm = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const confirmPassRef = useRef(null);
    const codeRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const [forms, setForm] = useState(1); // Cambia de formularios
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        code: "",
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        code: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEmailSubmit = (e) => { //Llama por primera vez a la api para enviar un correo
        e.preventDefault();
        const email = emailRef.current.value;

        if (!email) {
            setErrors({ ...errors, email: true });
            return;
        }

        // Llamada a la API Para enviar el correo!!!!!
        sendEmailConfirmation()
        console.log("Email enviado a:", email);
        // Se Cambia al segundo form si la llamada a la api da todo OK!!!!!
        setForm(2);
    };

    const handleResetPassSubmit = (e) => {
        e.preventDefault();

        const password = passRef.current.value;
        const confirmPassword = confirmPassRef.current.value;
        const code = codeRef.current.value;

        let formIsValid = true;

        if (!password || password.length < 8) {
            setErrors({ ...errors, password: true });
            formIsValid = false;
        } else {
            setErrors({ ...errors, password: false });
        }

        if (password !== confirmPassword) {
            setErrors({ ...errors, confirmPassword: true });
            formIsValid = false;
        } else {
            setErrors({ ...errors, confirmPassword: false });
        }

        if (!code) {
            setErrors({ ...errors, code: true });
            formIsValid = false;
        } else {
            setErrors({ ...errors, code: false });
        }

        if (formIsValid) {
            // Segunda llamada a la API para cambiar la contraseña!!!!!!
            ResetPassword();
            console.log("Contraseña cambiada correctamente, Ingrese normalmente");
        }
    };

    //llamada a la api para enviar mail con clave
    const sendEmailConfirmation = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://localhost:7276/api/Email/RequestPasswordReset`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": formData.email
                })
            });

            if (!response.ok) {
                throw new Error("Error, could not send email");
            }

            const dataResponse = await response.json();
            console.log(dataResponse);
            setLoading(false); // Desactiva el spinner
            //¿mostrar un mensaje que avisa que se envio el mail?

        } catch (error) {
            console.error("Error:", error);
        }
    };


    const ResetPassword = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://localhost:7276/api/Email/ResetPassword`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": formData.email,
                    "newPassword": formData.password,
                    "code": formData.code
                }),
            });
            if (!response.ok) {
                throw new Error("Error, could not change password");
            }

            const dataResponse = await response.json();
            console.log(dataResponse);
            setLoading(false); // Desactiva el spinner

            //¿mostrar un mensaje que avisa que se envio el mail?

        } catch (error) {
            console.error("Error:", error);
        }
    }



    return (
        <>
            {loading ? (
                <Spiner />
            ) : (


           <div className={forms === 1 ? 'outer-container-pass' : 'outer-container-newpass'}>
                    {forms === 1 ? (
                        <>
                        <div className="passReset">
                            <h3>Recuperar contraseña.</h3>
                            <form className="form-passReset" onSubmit={handleEmailSubmit}>
                            <div className="form-group">
                                    <label>Ingrese su email:</label>
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        name="email"
                                        placeholder="Introduce tu correo electrónico"
                                        value={formData.email}
                                        onChange={handleChange}
                                        
                                        className={errors.email ? "input-error" : ""}
                                    />
                                
                                {errors.email && (
                <div className="alert alert-warning">Completa el campo.</div>
              )}
                                </div>
                                <button type="submit" className="register-button">Enviar correo para cambiar la contraseña</button>
                            </form>
                            </div>
                        </>
                    ) : (
                        <>
                       
                        <div className="passReset">
                            <h4>Ingresar nueva contraseña. <br /> Código válido por 10 minutos</h4>
                            <form className="form-passReset" onSubmit={handleResetPassSubmit}>
                            <div className="form-group">
                                    <label>Código de recuperación de 6 digitos:</label>
                                    <input
                                        ref={codeRef}
                                        type="text"
                                        name="code"
                                        placeholder="Ingrese su código"
                                        value={formData.code}
                                        onChange={handleChange}
                                        className={errors.code ? "input-error" : ""}
                                    />
                                   
                                    {errors.code && (
                                        <div className="alert alert-warning">Por favor, ingresa el código.</div>)}
                                </div>

                                <div className="form-group">
                                    <label>Nueva contraseña:</label>
                                    <input
                                        ref={passRef}
                                        type="password"
                                        name="password"
                                        placeholder="Nueva contraseña"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={errors.password ? "input-error" : ""}
                                        
                                    />
                                    {errors.password && (
                                        <div className="alert alert-warning">La contraseña debe tener al menos 8 caracteres. Al menos una letra minuscula, una letra mayuscual, y un numero.</div>)}
                                </div>

                                <div className="form-group">
                                    <label>Confirmar nueva contraseña:</label>
                                    <input
                                        ref={confirmPassRef}
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Repite la nueva contraseña"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={errors.confirmPassword ? "input-error" : ""}
                                        
                                    />
                                    {errors.confirmPassword && (
                                        <div className="alert alert-warning">Las contraseñas no coinciden</div>)}
                                </div>

                                <button type="submit" className="register-button">Cambiar contraseña</button>
                            </form>
                            </div>
                           
                        </>
                    )}
                </div>
            )}</>
    );
}

export default PassResetForm
