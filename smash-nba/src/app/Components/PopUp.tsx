import React from 'react';
import '../StyleComponents/Popup.css';
interface PopupProps {
    onClose: () => void;
  }

  const Popup: React.FC<PopupProps> = ({ onClose }) => {

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Información del pop-up</h2>
        {/* Aquí puedes agregar el contenido del pop-up */}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Popup;
