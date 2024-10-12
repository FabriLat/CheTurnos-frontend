import carousel1fondo from './carousel1fondo.png';
import './Carousel.css';
import persona from './persona.jpg';

const Carousel = () => {
  return (
    <div style={{ width: '100%' }}>
      <img src={carousel1fondo} style={{ width: '100%' }} alt="Fondo del Carrusel" />
      <div className="carousel-text">
        ¡Tu propia app para gestionar los turnos de tu negocio!
        <p className='text'>Un sistema digital de turnos es una solución tecnológica que permite a los clientes y usuarios de cualquier empresa, negocio u organización tomar un turno de atención personalizada para la sucursal o tienda a la que se dirigen.</p>
        <img src={persona} className="persona-image" alt="Persona" />
      </div>
    </div>
  );
}

export default Carousel;
