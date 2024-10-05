const ShopsMock = [
  {
    "id": 1,
    "name": "Otaku Tatoo",
    "type": 0,
    "status": 0,
    "address": "Random Address 1234",
    "phone": "341-6999999",
    "email": "otakutatoo@gmail.com",
    "isPremium": false,
    "appoimentFrecuence": 60,
    "timeStart": "10:00:00",
    "timeEnd": "18:00:00",
    "workDays": [
      1,
      2,
      3,
      4,
      5
    ]
  },
  {
    "id": 2,
    "name": "Monster Barber",
    "type": 0,
    "status": 0,
    "address": "Random Address 1244",
    "phone": "341-6888888",
    "email": "monsterbarber@gmail.com",
    "isPremium": false,
    "appoimentFrecuence": 30,
    "timeStart": "09:00:00",
    "timeEnd": "19:00:00",
    "workDays": [
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": 3,
    "name": "Palan't",
    "type": 2,
    "status": 0,
    "address": "Salta 123",
    "phone": "341-1231234",
    "email": "palan.t@gmail.com",
    "isPremium": false,
    "appoimentFrecuence": 30,
    "timeStart": "10:30:00",
    "timeEnd": "15:30:00",
    "workDays": [
      1,
      2,
      3
    ]
  },
  {
    "id": 4,
    "name": "Teo El Perro Ateo",
    "type": 4,
    "status": 0,
    "address": "España 123",
    "phone": "341-1231234",
    "email": "ElPerro.teo@gmail.com",
    "isPremium": false,
    "appoimentFrecuence": 30,
    "timeStart": "08:00:00",
    "timeEnd": "18:30:00",
    "workDays": [
      1,
      2,
      3,
      4,
      5
    ]
  },
  {
    "id": 5,
    "name": "Sabandija",
    "type": 0,
    "status": 0,
    "address": "Catamarca 1426",
    "phone": "341-1231244",
    "email": "ElSantiago.idalgo@gmail.com",
    "isPremium": false,
    "appoimentFrecuence": 30,
    "timeStart": "08:00:00",
    "timeEnd": "16:00:00",
    "workDays": [
      2,
      3,
      4,
      5
    ]
  },
  {
    "id": 6,
    "name": "Teorema de Pythagoras",
    "type": 5,
    "status": 0,
    "address": "Santa Fe 1326",
    "phone": "341-1131244",
    "email": "Pytha.goras@gmail.com",
    "isPremium": false,
    "appoimentFrecuence": 30,
    "timeStart": "08:00:00",
    "timeEnd": "16:00:00",
    "workDays": [
      2,
      3,
      4,
      5
    ]
  }
];


import React, { useEffect, useState } from 'react'
import ShopCard from '../shopCard/ShopCard';
import Search from '../../search/Search';
import { Alert } from 'react-bootstrap';
import Spiner from '../spiner/Spiner';

const ShopList = () => {
  const [shops, setShops] = useState(ShopsMock); //*** */
  const [textSearched, setTextSearched] = useState('');
  const [loading, setLoading] = useState(false); //*** */
  useEffect(() => {
    // fetchShop(); //*** */
  }, []);


  const fetchShop = async () => {
    console.log("Inicio de fetch")
    try {
      const response = await fetch("https://localhost:7276/api/Shop/GetAll", {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Error in obtaining shops")
      }
      const shopData = await response.json();
      setShops(shopData);
      setLoading(false); // desactiva el spiners
    }
    catch (error) {
      console.error("Error:", error)
    }
  }

  const searchHandle = (text) => {
    setTextSearched(text);
  }

  const shopSearched = shops.filter((shop) => shop.name.toLowerCase().includes(textSearched.toLowerCase()));

  return (
    <>
      {loading ? (
        <Spiner />
      ) : (
        <div>
          <h1>Lista de negocios</h1>
          <Search onSearch={searchHandle} />
          {shopSearched.length > 0 ? (
            <div>
              {shopSearched.map(s => (
                <ShopCard
                  name={s.name}
                  address={s.address}
                  phone={s.phone}
                  timeStart={s.timeStart}
                  timeEnd={s.timeEnd}
                  idShop={s.id}
                />
              ))}
            </div>) : (
            <Alert key="danger" variant='danger'>
              No se encontro el negocio
            </Alert>)}
        </div>)};
    </>
  )
}

export default ShopList
