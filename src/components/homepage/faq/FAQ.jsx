import { useState } from "react";
import "./FAQ.css";
import reservacita from "./reservacita.png"; 
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 
import { useEffect } from 'react'; 

const FAQ = () => {
  useEffect(() => {
    AOS.init({
        duration: 1000, 
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "¿El programa se instala en una PC?",
      answer: "Es un sistema que trabaja en la nube, no requiere instalación. Por ejemplo, cuando uno usa Facebook entra con su usuario y contraseña y toda la información personal está en los servidores de Facebook.",
    },
    {
      question: "¿Los clientes pueden acceder a todo el sistema?",
      answer: "En el caso de contar con la APP para Clientes, los mismos sólo pueden ver la APP y el contenido exclusivamente para ellos.",
    },
    {
      question: "¿Solo se puede usar el sistema desde el negocio?",
      answer: "No, justamente es un sistema web, el cuál se puede usar con cualquier navegador web, de cualquier sistema operativo y dispositivo. Se puede ingresar estando en cualquier parte del mundo. ",
    },
    {
      question: "¿Cómo puedo contactar al servicio al cliente?",
      answer: "Puedes contactar a nuestro servicio al cliente a través del correo electrónico o por teléfono.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="section-container">
      <div data-aos="flip-down" className="faq-layout">
        <div className="faq-image-container">
          <img src={reservacita} alt="Reserva Cita" className="faq-image" />
        </div>
        <div className="faq-container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div
                  className={`faq-question ${activeIndex === index ? "active" : ""}`}
                  onClick={() => toggleAnswer(index)}
                >
                  {faq.question}
                  <span className={`arrow ${activeIndex === index ? "up" : "down"}`}>
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
