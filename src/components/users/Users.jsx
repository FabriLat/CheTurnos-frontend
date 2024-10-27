import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import EachUser from './EachUser';
import Spiner from '../spiner/Spiner';
import './users.css';

const Users = () => {
    const [user, setUsers] = useState([]);

    const [clients, setClients] = useState([]);
    const [Owners, setOwners] = useState([]);
    const [Employees, setEmployees] = useState([]);
    const [Admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Conseguir los usuarios
        fetchUser();
    }, []);

    //Se actualizan los Usuarios
    useEffect(() => {
        setClients(user.filter(u => u.type === "Client"));
        setOwners(user.filter(u => u.type === "Owner"));
        setEmployees(user.filter(u => u.type === "Employee"));
        setAdmins(user.filter(u => u.type === "SysAdmin"));
    }, [user])

    const fetchUser = async () => {
        try {
            const response = await fetch(`https://localhost:7276/api/SysAdmin/GetAll`,
                {
                    method: "GET",
                    mode: "cors",
                }
            );
            if (!response.ok) {
                throw new Error("Error in obtaining Users");
            }
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        }
        catch (error) {
            console.error("Error:", error)
        }

    }


    const onDeleteUser = async (userId) => {
        try {
            const response = await fetch(`https://localhost:7276/api/SysAdmin/Delete/${userId}`,
                {
                    method: "DELETE",
                    mode: "cors",
                }
            );
            if (!response.ok) {
                throw new Error("Error in deleting User");
            }
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
            setLoading(false);
        }
        catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div >
            {loading ? (
                <Spiner />
            ) : (<div className='container'>
                <div>
                    <h4>Clientes</h4>
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
                <div>
                    <h4>Admins</h4>
                    <ListGroup>
                        {Admins.map((user) => (
                            <EachUser key={user.id} name={user.userName} email={user.email} onDelete={onDeleteUser} id={user.id} />
                        ))}
                    </ListGroup>
                </div>
            </div>)}
        </div>

    )
}

export default Users
