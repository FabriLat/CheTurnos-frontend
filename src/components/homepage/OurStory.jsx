
import './OurStory.css';
import cheTurnosGif from './CheTurnos.gif';

const OurStory = () => {
  return (
    <div className="our-story-container">
      <div className="our-story-content">
        <div className="our-story-text-container">
          <h2 className="our-story-title">¿Qué es CheTurnos?</h2>
          <p className="our-story-text">
            CheTurnos es una plataforma web en la que cualquier negocio que ofrezca servicios con citas 
            (peluquerías, centros de estética, gimnasios, estudios médicos, etc.) puede registrarse gratuitamente 
            y comenzar a gestionar sus turnos en cuestión de minutos. Los usuarios también pueden registrarse 
            y acceder a la lista de negocios disponibles para reservar turnos fácilmente, eligiendo el horario 
            que mejor les convenga.
          </p>
          <p className="our-story-text">
            CheTurnos es una plataforma innovadora que nació como proyecto de estudiantes de la UTN 
            (Universidad Tecnológica Nacional), con el propósito de simplificar la gestión de turnos 
            para pequeños y medianos negocios en Argentina. La idea surgió durante una clase en la facultad, 
            donde el equipo identificó un problema común: la dificultad de los comercios para organizar y administrar citas 
            y la incomodidad de los usuarios al intentar reservar un turno.
          </p>
        </div>
        <div className="our-story-image-container">
          <img src={cheTurnosGif} alt="CheTurnos" className="our-story-image" />
        </div>
      </div>
    </div>
  );
};

export default OurStory;
