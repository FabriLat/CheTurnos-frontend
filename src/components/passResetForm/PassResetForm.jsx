
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useRef, React, useState } from 'react';
import { Button } from 'react-bootstrap';

const PassResetForm = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const confirmPassRef = useRef(null);
    const codeRef = useRef(null);

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
            console.log("Contraseña cambiada correctamente, Ingrese normalmente");
        }
    };

    return (
        <div>
            {forms === 1 ? (
                <>
                    <h3>Para recuperar su contraseña le enviaremos un codigo a su email.</h3>
                    <Form onSubmit={handleEmailSubmit}>
                        <InputGroup>
                            <InputGroup.Text>Ingrese su email:</InputGroup.Text>
                            <Form.Control
                                ref={emailRef}
                                type="email"
                                name="email"
                                placeholder="Introduce tu correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </InputGroup>
                        {errors.email && <p style={{ color: 'red' }}>Por favor, ingresa un email valido.</p>}
                        <Button className="mt-3" type="submit">Enviar correo para cambiar la contraseña</Button>
                    </Form>
                </>
            ) : (
                <>
                    <h3>Introduce tu nueva contraseña y el codigo recibido tenes 10 minutos para hacerlo</h3>
                    <Form onSubmit={handleResetPassSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Código de recuperación de 6 digitos</Form.Label>
                            <Form.Control
                                ref={codeRef}
                                type="text"
                                name="code"
                                placeholder="Ingrese su código"
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />
                            {errors.code && <p style={{ color: 'red' }}>Por favor, ingresa el código.</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nueva contraseña</Form.Label>
                            <Form.Control
                                ref={passRef}
                                type="password"
                                name="password"
                                placeholder="Nueva contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <p style={{ color: 'red' }}>La contraseña debe tener al menos 8 caracteres. Al menos una letra minuscula, una letra mayuscual, y un numero.</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirmar nueva contraseña</Form.Label>
                            <Form.Control
                                ref={confirmPassRef}
                                type="password"
                                name="confirmPassword"
                                placeholder="Repite la nueva contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            {errors.confirmPassword && <p style={{ color: 'red' }}>Las contraseñas no coinciden.</p>}
                        </Form.Group>

                        <Button type="submit">Cambiar contraseña</Button>
                    </Form>
                </>
            )}
        </div>
    );
}

export default PassResetForm
