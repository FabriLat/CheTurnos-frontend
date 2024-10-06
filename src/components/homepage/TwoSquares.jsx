import './TwoSquares.css';

const TwoSquares = () => {
  return (
    <div className="squares-container">
      <div className="square red">
        <div className="small-square-light">
            <div className='text1'>
          <h1 className="large-text">¿Tienes un negocio?</h1>
          <h2 className="small-text">Registra tu empresa y empieza a gestionar tus citas de manera eficiente.</h2>
          <button className="square-button">Resgistrate</button>
          <h2 className="small-text"> ¿Ya estás registrado?</h2>
          <button className="square-button">Iniciar Sesión</button>
          </div>
        </div>
      </div>
      
      <div className="square blue">
        <div className="small-square-pink">
            <div className='text2'>
          <h1 className="large-text">¿Necesitas un turno?</h1>
          <h2 className="small-text">Crea tu cuenta para reservar citas en tus negocios favoritos.</h2>
          <button className="square-button">Crear mi cuenta</button>
          <h2 className="small-text">¿Ya tienes una cuenta?</h2>
          <button className="square-button">Iniciar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoSquares;
