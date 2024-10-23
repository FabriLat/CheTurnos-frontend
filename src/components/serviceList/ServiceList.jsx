// const serviceMock = [
//     {
//         "id": 1,
//         "shopId": 2,
//         "name": "corete de cosas ",
//         "description": "LE cortan las cosas cortan las cosascortan las cosas cortan las cosas  cortan las cosas cortan las cosas cortan las cosas cortan las cosas cortan las cosas cortan las cosas cortan las cosas ",
//         "price": 223.45,
//         "duration": "02:20:00",
//         "status": "Active"
//     },
//     {
//         "id": 2,
//         "shopId": 2,
//         "name": "LE pintan las cosas ",
//         "description": "Le pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosas.Le pintan las cosasLe pintan las cosas. ",
//         "price": 203.45,
//         "duration": "02:20:00",
//         "status": "Active"
//     },
//     {
//         "id": 3,
//         "shopId": 2,
//         "name": "LE pintan las cosas ",
//         "description": "Le pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosas.Le pintan las cosasLe pintan las cosas. ",
//         "price": 203.45,
//         "duration": "02:20:00",
//         "status": "Active"
//     },
// ]

import { useContext, useState, useEffect } from 'react';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import ServiceCard from '../serviceCard/ServiceCard';
import Spiner from '../spiner/Spiner';
import './serviceList.css'
const ServiceList = () => {
    const { shopId } = useContext(AuthenticationContext);

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shopName, setShopName] = useState("");

    useEffect(() => {
        fetchNameShop();
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch(`https://localhost:7276/api/Service/GetAllByShopId/${shopId}`, {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Error in obtaining Services");
            }
            const servicesData = await response.json();
            setServices(servicesData);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchNameShop = async () => {
        try {
            const response = await fetch(`https://localhost:7276/api/Shop/GetById/${shopId}`, {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Error in obtaining shop");
            }
            const ShopData = await response.json();
            setShopName(ShopData);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            {loading ? (
                <Spiner />
            ) : (
                <div className="outer-container">
                    <div className="shop-list-container">
                    <div className="title-service">
                    <h1 className="service-title"> Selecciona un servicio de {shopName.name}</h1>
                    </div>
                    <div className="card-service">
                        {services.map(s => (
                            <ServiceCard
                                nameService={s.name}
                                description={s.description}
                                duration={s.duration}
                                price={s.price}
                                key={s.id}
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

