import { Button } from "react-bootstrap";
import '../ownerPage/Sidebar.css';


const OwnerProviderButtonList = ({ me, myShopEmployees, token, setProviderAppArray, ocultOtherviews }) => {

    const getAllAppointmentsByProviderId = async (providerId) => {
        fetch(`https://localhost:7276/api/Appointment/GetAllApointmentsByProviderId/${providerId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    // Manejo de errores según el código de estado
                    if (response.status === 404) {
                        console.log("Sí, not found")
                        setProviderAppArray("Aun no posee turnos")
                        throw new Error('Not Found (404)');
                    } else if (response.status === 401) {
                        throw new Error('Unauthorized (401)');
                    } else {
                        throw new Error(`Error: ${response.status}`);
                    }
                }
            })
            .then((data) => {
                console.log(`provider appointments: ${data}`);
                setProviderAppArray(data);
            })
            .catch((error) => {
                setProviderAppArray("Aun no posee turnos")
                console.log(error)
            })
    };

    return (
        <div className="w-100 my-2 d-flex flex-column align-items-center gap-1">
            <button className="sidebar-button-options"
                key={me.id}
                onClick={() => {
                    ocultOtherviews()
                    getAllAppointmentsByProviderId(me.id)
                }}
            >
                {me.username}
            </button>
            {myShopEmployees
                ? myShopEmployees.map((emp) =>
                    <button className="sidebar-button-options"
                        key={emp.id}
                        onClick={() => {
                            ocultOtherviews()
                            getAllAppointmentsByProviderId(emp.id)
                        }}
                    >
                        {emp.name}
                    </button>
                )
                : ""
            }
        </div>
    );
};

export default OwnerProviderButtonList;

