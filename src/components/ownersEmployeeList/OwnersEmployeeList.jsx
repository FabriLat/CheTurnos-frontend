import { useState } from 'react'
//import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { useContext, useEffect } from 'react';
import { ShopContext } from '../../services/shop/ShopContext';
import { Button } from 'react-bootstrap';
import Spiner from '../spiner/Spiner';
import OwnersEmployeeCard from '../ownersEmployeeCart/OwnersEmployeeCart';
import { useNavigate } from 'react-router-dom';
import './ownersEmployeeList.css'

const OwnersEmployeeList = () => {

    //const { user, token } = useContext(AuthenticationContext);
    const { myShopEmployees } = useContext(ShopContext);

    const [loading, setLoading] = useState(false);
    const navegate = useNavigate();

    const handleButton = () => {
        navegate("/OwnersEmployeeRegister");
    }

    return (
        <div>
            <div>
                {loading ? (
                    <Spiner />
                ) : (
                    <div className="outer-container-employees-list">
                        <div className="shop-list-container">
                            <div className="title-service">
                                <h1 className="service-title">Lista de Empleados:</h1> 
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