import { useEffect, useState } from 'react';
import ShopCard from '../shopCard/ShopCard';
import Search from '../../search/Search';
import { Alert } from 'react-bootstrap';
import Spiner from '../spiner/Spiner';
import './shopList.css'; 
import logo from './CheTurnosIco.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { useContext } from 'react';


const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [textSearched, setTextSearched] = useState('');
  const [loading, setLoading] = useState(true);

  const { user, token, shopId } = useContext(AuthenticationContext);
 console.log(`este es el token`, token);

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    try {
      const response = await fetch("https://localhost:7276/api/Shop/GetAll", {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Error in obtaining shops");
      }
      const shopData = await response.json();
      setShops(shopData);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const searchHandle = (text) => {
    setTextSearched(text);
  };

  const shopSearched = shops.filter((shop) =>
    shop.name.toLowerCase().includes(textSearched.toLowerCase())
  );


  const removeShop = (id) => {
    setShops((prevShops) => prevShops.filter((shop) => shop.id !== id));
  };

  return (
    <>
      {loading ? (
        <Spiner />
      ) : (
        <div className="outer-container">
          <div className="shop-list-container">
            <div className="title-container">
            <img
                  className="calendarShop"
                  src={logo}
                  alt="Logo"
                />
              <h1 className="shop-title">¡Encuentra tu negocio!</h1>
            </div>
            <div className="search-input">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <Search onSearch={searchHandle} />
            </div>
            {shopSearched.length > 0 ? (
              <div className="card-container">
                {shopSearched.map((s) => (
                  <ShopCard
                    name={s.name}
                    address={s.address}
                    phone={s.phone}
                    timeStart={s.timeStart}
                    timeEnd={s.timeEnd}
                    idShop={s.id}
                    key={s.id}
                    onRemoveShop = {removeShop}
                  />
                ))}
              </div>
            ) : (
              <Alert key="danger" variant="danger" style={{width: "30%", marginLeft: "35%"}}>
                No se encontró el negocio
              </Alert>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShopList;
