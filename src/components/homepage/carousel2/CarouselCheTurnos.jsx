import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CarouselCheTurnos.css';
import carousel1 from './carousel1.jpg';
import carousel2 from './carousel2.jpg';
import carousel3 from './carousel3.jpg';
import { FaStar } from 'react-icons/fa';
import user1 from './user1.jpg'; 
import user2 from './user2.jpg'; 
import user3 from './user3.jpg'; 

const CarouselCheTurnos = () => {
  return (
    <Carousel interval={3000} controls={false} pause={false}>
      <Carousel.Item>
        <div className="carousel-content">
          <img src={carousel1} alt="First slide" className="carousel-image" />
          <div className="overlay">
            <div className="opinion">
              <img src={user1} alt="User 1" className="user-image" />
              <p>Una aplicación increíblemente fácil de usar que ha mejorado mi productividad.</p>
              <div className="stars">
                {Array(5).fill(<FaStar className="star" />)}
              </div>
              <div className="user-info">
                <p>Juan Pérez - Barbería Navaja, Buenos Aires</p>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-content">
          <img src={carousel2} alt="Second slide" className="carousel-image" />
          <div className="overlay">
            <div className="opinion">
              <img src={user2} alt="User 2" className="user-image" />
              <p>¡Es genial para organizar mis turnos y mantener todo en orden!</p>
              <div className="stars">
                {Array(5).fill(<FaStar className="star" />)}
              </div>
              <div className="user-info">
                <p>Ana Gómez - Peluquería Ponte Guapa!, Córdoba</p>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-content">
          <img src={carousel3} alt="Third slide" className="carousel-image" />
          <div className="overlay">
            <div className="opinion">
              <img src={user3} alt="User 3" className="user-image" />
              <p>No podría estar más contento con CheTurnos, ¡totalmente recomendado!</p>
              <div className="stars">
                {Array(5).fill(<FaStar className="star" />)}
              </div>
              <div className="user-info">
                <p>Alicia Fernández - Estetica Celma, Rosario</p>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselCheTurnos;
