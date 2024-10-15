import { useState } from "react";
import { Button } from "react-bootstrap";

const SelectHour = () => {

    const [hour,setHour] = useState("");

    const selectHandle = (e) => {
        setHour(e.target.value)
    }
    
  
    const hourHandle = () => {
        console.log(`Hora seleccionada: ${hour}`)
    }

  return (
    <>
      <h1>Selecciona hora</h1>
      <input onChange={selectHandle} type="time" />
      <Button onClick={hourHandle} className="d-block m-auto">Seleccionar hora</Button>
    </>
  );
};
export default SelectHour;
