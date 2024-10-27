import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import EachUser from './EachUser';
const Users = () => {

    const [clients, setClients] = useState([]);
    const [Owners, setOwners] = useState([]);
    const [Employees, setEmployees] = useState([]);


    useEffect(() => {
        //llamada a la api para conseguir los usuarios
        fetchClient();
        fetchOwner();
        fetchEmployee();
    }, []);

    const fetchClient = async () => {

    }


    const fetchOwner = async () => {

    }

    const fetchEmployee = async () => {

    }


    const onDeleteUser = async (userId) => {

    }

    return (
        <div>
            <div>
                <h4>Clients</h4>
                <ListGroup>
                    {clients.map((user) => (
                        <EachUser key={user.id} name={user.userName} email={user.email} onDelete={onDeleteUser} id={user.id} />
                    ))}
                </ListGroup>
            </div>
            <div>
                <h4>Dueños</h4>
                <ListGroup>
                    {Owners.map((user) => (
                        <EachUser key={user.id} name={user.userName} email={user.email} onDelete={onDeleteUser} id={user.id} />
                    ))}
                </ListGroup>
            </div>
            <div>
                <h4>Empleados</h4>
                <ListGroup>
                    {Employees.map((user) => (
                        <EachUser key={user.id} name={user.userName} email={user.email} onDelete={onDeleteUser} id={user.id} />
                    ))}
                </ListGroup>
            </div>
        </div>

    )
}

export default Users
