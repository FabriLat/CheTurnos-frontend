import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h4>CheTurnos</h4>
        <div className="footer-icons">
          <a href="https://wa.me/XXXXXXXXX" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
          </a>
          <a href="mailto:contacto@cheturnos.com">
            <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
