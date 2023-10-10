import * as React from 'react';
import { useState } from 'react'; // Importa useState para gestionar el estado de los campos de entrada
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import logo from '../img/logo.png';
import login from '../img/login.png';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ Email: '', Contrasena: '' });

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4003/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/inicio');
      } else {
        console.error('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-gray-200 h-screen flex flex-col">
      <div className="p-4 rounded-t-lg">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
      </div>
      <div className="flex-grow flex flex-col items-center justify-start pt-10 rounded-t-xl">
        <div className="bg-white h-4/5 w-2/5 flex flex-col items-center justify-start p-4 rounded-lg shadow-lg">
          <img src={login} alt="Imagen de login" className="w-20 h-20 mb-4 mt-7" />
          <h1 className="text-2xl font-semibold mb-6 mt-3">Inicio de sesión</h1>
          <input
            type="text"
            name="Email"
            placeholder="Correo electrónico"
            aria-label="Correo electrónico"
            className="border border-gray-400 rounded-md p-2 mb-8 w-2/4 mt-10 text-center"
            onChange={handleInputChange}
            value={formData.Email}
            required
          />
          <input
            type="password"
            name="Contrasena"
            placeholder="Contraseña"
            aria-label="Contraseña"
            className="border border-gray-400 rounded-md p-2 mb-4 w-2/4 text-center"
            onChange={handleInputChange}
            value={formData.Contrasena}
            required
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-6 py-2 mt-7"
            onClick={handleLogin}
          >
            Entrar
          </button>
          <div className="mt-8">
            <a href="#">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;