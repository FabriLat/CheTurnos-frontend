import { FaLightbulb, FaLock, FaCogs } from 'react-icons/fa';
import './Card.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Card = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="wrapper">
      <div data-aos="zoom-out" className="title">
        <h3>Una aplicación:</h3>
      </div>
      <div className="container">
        <div data-aos="fade-right" className="card">
          <FaLightbulb className="icon" />
          <h3>Simple</h3>
          <p>Una aplicación muy sencilla de utilizar para tu negocio</p>
        </div>
        <div data-aos="zoom-out" className="card">
          <FaLock className="icon" />
          <h3>Segura</h3>
          <p>Tus datos estarán seguros en un hosting con integridad y confiabilidad.</p>
        </div>
        <div data-aos="fade-left" className="card">
          <FaCogs className="icon" />
          <h3>Customizable</h3>
          <p>Desde el administrador web podrás configurar y generar turnos.</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
