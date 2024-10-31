
import { useContext, useState, useEffect } from "react";
import { AuthenticationContext } from "../../services/authentication/AuthenticationContext";
import ServiceCard from "../serviceCard/ServiceCard";
import Spiner from "../spiner/Spiner";
import "./serviceList.css";
const ServiceList = () => {
  const { shopId } = useContext(AuthenticationContext);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchServices();
  }, []);

  const shopName = services.map(item => item.shopName)[0];

  const fetchServices = async () => {
    try {
      const response = await fetch(`https://localhost:7276/api/Service/GetAllServicesByShopWithNameShop/${shopId}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      if (!response.ok) {
        throw new Error("Error in obtaining Services");
      }
      const data = await response.json();
      setServices(data);
      setLoading(false);
    } 
    catch(error){
      console.error("Error:", error)
    }
  };

  return (
    <div>
      {loading ? (
        <Spiner />
      ) : (
        <div className="outer-container-service-list">
          <div className="shop-list-container">
            <div className="title-service">
              <h1 className="service-title">
                {" "}
                Selecciona un servicio de {shopName}
              </h1>
            </div>
            <div className="card-service">
              {services.map((s) => (
                <ServiceCard
                  key={s.serviceId}
                  nameService={s.serviceName}
                  description={s.description}
                  duration={s.duration}
                  price={s.price}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
