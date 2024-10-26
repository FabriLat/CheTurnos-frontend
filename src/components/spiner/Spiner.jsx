import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
const Spiner = () => {
  return (
    <Container style={{display:"flex", justifyContent: "center", alignItems: "center", height:"100vh" }}>

        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        
    </Container>
  )
}

export default Spiner