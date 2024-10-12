import './OurStory.css';
import cheTurnosGif from './CheTurnos.gif';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';

const OurStory = () => {
  useEffect(() => {
    AOS.init({
        duration: 1000, 
    });
  }, []);

  return (
    <div className="our-story-container">
      <div className="our-story-content">
        <div data-aos="fade-right" className="our-story-text-container">
          <h2 className="our-story-title">¿Qué es CheTurnos?</h2>
          <p className="our-story-text">
            CheTurnos es una plataforma web en la que cualquier negocio que ofrezca servicios con citas 
            (peluquerías, centros de estética, gimnasios, estudios médicos, etc.) puede registrarse gratuitamente 
            y comenzar a gestionar sus turnos en cuestión de minutos. Los usuarios también pueden registrarse 
            y acceder a la lista de negocios disponibles para reservar turnos fácilmente, eligiendo el horario 
            que mejor les convenga.
          </p>
        </div>
        <div data-aos="fade-left" className="our-story-image-container">
          <img src={cheTurnosGif} alt="CheTurnos" className="our-story-image" />
        </div>
      </div>
    </div>
  );
};

export default OurStory;
