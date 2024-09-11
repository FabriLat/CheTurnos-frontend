import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const RegisterForm = () => {

    function isAlphanumeric(pass) {
        let hasLetter = false;
        let hasNumber = false;
        for (let i = 0; i < pass.length; i++) {
            const asciiCode = pass.charCodeAt(i);
    
            if (asciiCode >= 48 && asciiCode <= 57) { // 0-9
                hasNumber = true;
            } else if ((asciiCode >= 65 && asciiCode <= 90) || // A-Z
                       (asciiCode >= 97 && asciiCode <= 122)) { // a-z
                hasLetter = true;
            } else {
                return false; 
            }
        }
        return hasLetter && hasNumber;
    }
    

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;

    const newErrors = {
      fullName: false,
      email: false,
      password: false,
      confirmPassword: false
    };

    if (!formData.fullName) {
        setErrors({...formData,
            fullName : true
        });
      formIsValid = false;
    }

    if (!formData.email) {
        setErrors({...formData,
            email : true
        })
      formIsValid = false;
    } 
    if (!formData.password || (formData.password.length) < 8 || isAlphanumeric(formData.password) == false){
        if((isAlphanumeric(formData.password))==false) {alert("La contraseña no es alfanumerica")}
        setErrors({...formData,
            password : true
        })
      formIsValid = false;
    }   

    if (formData.password !== formData.confirmPassword) {
        setErrors({...formData,
            confirmPassword : true
        })
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      console.log('Formulario enviado', formData);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Registro</h2>
      <Form className='mt-5' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduce tu nombre completo"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='mt-4' >
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduce tu correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='mt-4'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introduce tu contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
        </Form.Group>

        <Form.Group className='mt-4'>
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma tu contraseña"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className='mt-3' variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
