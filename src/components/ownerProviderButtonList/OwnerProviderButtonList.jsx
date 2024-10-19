import { Button } from "react-bootstrap";

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
                    throw new Error("The response has some errors");
                }
            })
            .then((data) => {
                console.log(`provider appointments: ${data}`);
                setProviderAppArray(data);
            })
            .catch((error) => console.log(error))
    };

    return (
      <div className="w-100 my-2 d-flex flex-column align-items-center gap-1">
        <Button className="w-75"
            key={me.id}
            onClick={() => {
                ocultOtherviews()
                getAllAppointmentsByProviderId(me.id)
            }}
        >
            {me.username}
        </Button>
        {myShopEmployees
            ? myShopEmployees.map((emp) =>
                <Button className="w-75"
                    key={emp.id}
                    onClick={() => {
                        ocultOtherviews()
                        getAllAppointmentsByProviderId(emp.id)
                    }}
                >
                    {emp.name}
                </Button>
            )
            : ""
        }
      </div>
    );
  };
  
  export default OwnerProviderButtonList;