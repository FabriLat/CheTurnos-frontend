
import React from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ShopCard = ({name, address, phone, timeStart, timeEnd, key}) => {
    const formatTime = (time)=>{
        const [hour, minute] = time.split(":");
        return `${hour}:${minute}`;
    }
    
    return (
        <Card key="{key}">
        <Card.Header as="h5">{name}</Card.Header>
        <Card.Body>
          <Card.Title>{address}</Card.Title>
          <Card.Text>
            Telefono: {phone}<br/>
            Abre: {formatTime(timeStart)}<br/>
            Cierra: {formatTime(timeEnd)}<br/>
          </Card.Text>
          <Button variant="primary">Pedi Tu Tuno!</Button>
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
    key: PropTypes.number,

}

export default ShopCard
