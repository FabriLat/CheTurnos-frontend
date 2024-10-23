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
        
            <div>
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
                                {employees.map((e) => (
                                    <OwnersEmployeeCard
                                        key={e.id}
                                        employeeId={e.id}
                                        name={e.name}
                                        email={e.email}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnersEmployeeList;