import React, { useState } from 'react'
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Spiner from '../spiner/Spiner';
import OwnersEmployeeCard from '../ownersEmployeeCart/OwnersEmployeeCart';
import { useNavigate } from 'react-router-dom';

const OwnersEmployeeList = () => {

    const { user, token, setShopId, shopId} = useContext(AuthenticationContext);
    
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navegate = useNavigate();


    useEffect(() => {
        fetchData();
        console.log(shopId);
        console.log(employees);
    }, []);

    const fetchData = async () => {
        await fetchDataUser();
        if (shopId != null) {
            await fetchEmployees();
        }
    }

    const fetchDataUser = async () => {
        try {
            const response = await fetch(
                `https://localhost:7276/api/Owner/GetOwnerById/${user.id}`,
                {
                    method: "GET",
                    mode: "cors"
                }
            );
            if (!response.ok) {
                throw new Error("Error in obtaining user");
            }
            const data = await response.json();
            
            setShopId(data.shopId);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await fetch(
                `https://localhost:7276/api/Employee/GetAllByShopId/${shopId}`,
                {
                    method: "GET",
                    mode: "cors"
                }
            );
            if (!response.ok) {
                throw new Error("Error in obtaining employees");
            }
            const employeesData = await response.json();
            setEmployees(employeesData);
            console.log(employeesData);
            setLoading(false); // desactiva el spiners
        } catch (error) {
            console.error("Error:", error);
        }
    };





    const handleButton = () => {
        navegate("/OwnersEmployeeRegister");
    }

    return (
        <div>
            <h2 className="mt-5">Empleados</h2>

            <Button variant="primary" onClick={handleButton}>
                Agregar nuevo empleado
            </Button>
            <div>
                {loading ? (
                    <Spiner />
                ) : (
                    <>
                        {employees.map((e) => (
                            <OwnersEmployeeCard
                                key={e.id}
                                employeeId={e.id}
                                name={e.name}
                                email={e.email}
                                //onfetch={} //funcion o bander para refrescar los empelado!!
                            />
                        ))}
                    </>
                )}
            </div>

        </div>
    )
}

export default OwnersEmployeeList
