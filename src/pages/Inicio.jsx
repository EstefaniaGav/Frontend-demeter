import React from 'react';
import Menu from '../components/Menu';
import logo2 from '../img/image5.png';

function Inicio() {
  return (
    <div className="flex min-h-screen">
      <Menu />
      <div className="flex-grow flex items-center justify-center">
        <img src={logo2} alt="Logo" className="w-200 h-80" />
      </div>
    </div>
  );
}

export default Inicio;
