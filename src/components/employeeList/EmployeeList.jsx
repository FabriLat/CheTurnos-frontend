import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import Spiner from "../spiner/Spiner";
import EmployeeCard from "../employeeCard/EmployeeCard";
import './employeeList.css'

const EmployeeList = () => {
  const { shopId, token } = useContext(AuthenticationContext);

  const [employees, setEmployees] = useState([]);
  const [owner, setOwner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopName, setShopName] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchNameShop();
      await fetchEmployees();
      await fetchOwner();
      setLoading(false);
    };
    fetchData();
  }, [shopId]);

  useEffect(() => {
    if (employees || owner) {
      setAllEmployees([owner, ...employees]);
    } else {
      setAllEmployees(owner);
    }
  }, [employees, owner]);


  const fetchNameShop = async () => {
    try {
      const response = await fetch(
        `https://localhost:7276/api/Shop/GetById/${shopId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`, // Agregar el token aquí
          },
          mode: "cors",
        }
      );
      if (!response.ok) {
        throw new Error("Error in obtaining shop");
      }
      const ShopData = await response.json();
      setShopName(ShopData);
      setLoading(false); // desactiva el spiners
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
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );
      if (!response.ok) {
        throw new Error("Error in obtaining employees");
      }
      const employeesData = await response.json();
      setEmployees(employeesData);
      console.log(employees);
      setLoading(false); // desactiva el spiners
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchOwner = async () => {
    try {
      const response = await fetch(
        `https://localhost:7276/api/Owner/GetOwnerByShopId/${shopId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          mode: "cors",
        });
      if (!response.ok) {
        throw new Error("Error in obtaining Owner");
      }
      const ownerData = await response.json();
      setOwner(ownerData);
      console.log(owner);
      setLoading(false); // desactiva el spiners
    }
    catch (error) {
      console.error("Error:", error);
    }

  }



return (
  <>
    {loading ? (
      <Spiner />
    ) : (
      <div className="outer-container-employee-list">
        <div className="shop-list-container">
          <div className="title-service">
            <h1 className="service-title"> Selecciona un empleado de {shopName.name}</h1>
          </div>
          <div className="card-service">
            {allEmployees.map((e) => (
              <EmployeeCard
                key={e.id}
                employeeId={e.id}
                name={e.name}
                email={e.email}
                state={e.status}
              />
            ))}
          </div>
        </div>
      </div>
    )}
  </>
);
};

export default EmployeeList;
