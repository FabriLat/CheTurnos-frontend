import { useState } from 'react'
//import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Spiner from '../spiner/Spiner';
import OwnersEmployeeCard from '../ownersEmployeeCart/OwnersEmployeeCart';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
const OwnersEmployeeList = () => {
    const { user, token } = useContext(AuthenticationContext);
    const [myShopEmployees, setMyShopEmployees] = useState([]);

    const [loading, setLoading] = useState(false);
    const navegate = useNavigate();

    const getMyShopEmployees = async () => {
        setLoading(true)
        await fetch(`https://localhost:7276/api/Employee/GetMyShopEmployees/${user.id}`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                mode: "cors",
            })
            .then(response => {
                if (response.ok) {
                    setLoading(false);
                    return response.json();
                } else {
                    // Manejo de errores según el código de estado
                    if (response.status === 404) {
                        setLoading(false);
                        throw new Error('Not Found (404)');
                    } else if (response.status === 401) {
                        setLoading(false);
                        throw new Error('Unauthorized (401)');
                    } else {
                        setLoading(false);
                        throw new Error(`Error: ${response.status}`);
                    }
                }
            })
            .then((data) => {
                // Procesar los datos aquí
                console.log(data);
                setMyShopEmployees(data);
                setEmpFlag(false);
                console.log(`My shop employees: ${data}`);
            })
            .catch((error) => {
                // Manejo del error aquí
                setLoading(false);
                console.log(error)
            })

    };

    const removeEmployee = (id) => {
        setMyShopEmployees((prevEmployee) => prevEmployee.filter((e) => e.id !== id));
    }

    useEffect(() => {
        getMyShopEmployees();
    }, []);


    const handleButton = () => {
        navegate("/OwnersEmployeeRegister");
    }

    return (<>
        {loading ? (
            <Spiner />
        ) : (
            <div className="outer-container">
                <div className="shop-list-container">
                    <div className="title-service">
                        <h1 className="service-title">Lista de Empleados</h1> {/* Changed title for clarity */}
                    </div>
                    <Button variant="primary" onClick={handleButton}>
                        Agregar nuevo empleado
                    </Button>

                    <div className="card-service">
                        {myShopEmployees.map((e) => (
                            <OwnersEmployeeCard
                                key={e.id}
                                employeeId={e.id}
                                name={e.name}
                                email={e.email}
                                onRemoveEmployee={removeEmployee}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
    );
};

export default OwnersEmployeeList;