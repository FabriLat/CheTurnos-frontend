
import { useContext } from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import useValidateUser from '../hookCustom/useValidateUser';


const ShopCard = ({name, address, phone, timeStart, timeEnd, idShop, onRemoveShop}) => {
  const {setShopId} = useContext (AuthenticationContext);
  const {dataForRequest, setDataForRequest} = useContext (AuthenticationContext);
  const navegate = useNavigate();
  const { isAdmin, isClient } = useValidateUser();

  const handlebutton = ()=>{
    setShopId(idShop); 
    setDataForRequest({...dataForRequest, shopId: idShop});
    navegate('/serviceList')
  }

  const deleteShop = (async () => {
    try {
      const response = await fetch(`https://localhost:7276/api/Shop/PermanentDeletionShop/${idShop}`, {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Error in delete shop");
      }
      onRemoveShop(idShop);
      console.log("Shop deleted successfully")
    }
    catch (error) {
      console.error("Error:", error);
    }
  })


  const formatTime = (time)=>{
        const [hour, minute] = time.split(":");
        return `${hour}:${minute}`;
    }
    
    return (
        <Card key={idShop} style={{border: '1px solid #6d21dd' }}>
        <Card.Header style={{color:'#6d21dd',backgroundColor: 'white', borderBottom: '3px solid #6d21dd'}}as="h5">{name}</Card.Header>
        <Card.Body>
          <Card.Title>{address}</Card.Title>
          <Card.Text>
            Telefono: {phone}<br/>
            Abre: {formatTime(timeStart)}<br/>
            Cierra: {formatTime(timeEnd)}<br/>
          </Card.Text>
          {(isClient()) && <Button variant="primary" onClick={handlebutton} style={{backgroundColor: '#6d21dd'}}>Pedi tu Turno!</Button>}
          {(isAdmin()) && <Button variant="danger" onClick={deleteShop} style={{backgroundColor: '#FF00D'}}>Eliminar Negocio en cascada</Button>}
        </Card.Body>
      </Card>
    )
}

ShopCard.propType = {
    name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    timeStart: PropTypes.date,
    timeEnd: PropTypes.date,
    idShop: PropTypes.number,
    onRemoveShop: PropTypes.func,
    key: PropTypes.number,

}

export default ShopCard
