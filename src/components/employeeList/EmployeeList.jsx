import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import Spiner from "../spiner/Spiner";
import EmployeeCard from "../employeeCard/EmployeeCard";

const EmployeeList = () => {
  const { shopId } = useContext(AuthenticationContext);

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetchNameShop();
      await fetchEmployees();
      setLoading(false);
    };

    fetchData();
  }, [shopId]);

  const fetchNameShop = async () => {
    try {
      const response = await fetch(
        `https://localhost:7276/api/Shop/GetById/${shopId}`,
        {
          method: "GET",
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
  return (
    <div>
      {loading ? (
        <Spiner />
      ) : (
        <>
          <h1>Negocio: {shopName.name}</h1>
          <h2 className="mt-5">Selecciona empleado</h2>
          {employees.map((e) => (
            <EmployeeCard
              key={e.id}
              employeeId={e.id}
              name={e.name}
              email={e.email}
              state={e.status}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default EmployeeList;
