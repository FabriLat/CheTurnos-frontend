
import './Sidebar.css'
import executive from './executive.png';
import logo from './CheTurnosIco.png';

const OwnerSection = () => {
  return (
    <div>
      <img
        className="executive"
        src={executive}
        alt="Logo"
      />

      <img
        className="calendarOwner"
        src={logo}
        alt="Logo"
      />
      <h3 className='welcome'>¡Bienvenido a su negocio!</h3>


    </div>
  )
}

export default OwnerSection
