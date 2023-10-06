import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Menu from '../components/Menu';

export const Modal = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    Nombre: "",
    Telefono: "",
    Cedula: "", // Deja el campo en blanco
    Ciudad: "",
    Email: "",
  });
  const [errors, setErrors] = useState({});
  const [cedulaExists, setCedulaExists] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  async function fetchData(id) {
    try {
      const response = await fetch(`http://localhost:4003/api/supplier/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error al obtener datos del proveedor", error);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Si se está editando un proveedor y se cambia la cédula, reiniciar la verificación de existencia
    if (id && name === "Cedula") {
      setCedulaExists(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Realizar validaciones aquí
    const validationErrors = {};

    if (!formData.Nombre) {
      validationErrors.Nombre = "El nombre es requerido";
    }

    if (!formData.Telefono) {
      validationErrors.Telefono = "El teléfono es requerido";
    }

    if (!formData.Cedula) {
      validationErrors.Cedula = "La cédula es requerida";
    }

    if (!formData.Ciudad) {
      validationErrors.Ciudad = "La ciudad es requerida";
    }

    if (!formData.Email) {
      validationErrors.Email = "El correo electrónico es requerido";
    } else if (!isValidEmail(formData.Email)) {
      validationErrors.Email = "El correo electrónico no es válido";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Verificar si la cédula ya existe antes de enviar el formulario
      if (await checkCedulaExists(formData.Cedula)) {
        setErrors({ Cedula: "La cédula ya está en uso" });
        return;
      }

      const url = id
        ? `http://localhost:4003/api/supplier/${id}`
        : "http://localhost:4003/api/supplier";

      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Proveedor guardado exitosamente");
        navigate("/supplier");
      } else {
        console.error("Error al guardar el proveedor");
      }
    } catch (error) {
      console.error("Error al procesar el formulario", error);
    }
  }

  async function checkCedulaExists(cedula) {
    try {
      const response = await fetch(`http://localhost:4003/api/supplier/cedula/${cedula}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error al verificar la cédula", error);
      return false;
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-64">
        <Menu />
      </div>

      <div className="bg-ECECEC flex-grow min-h-screen flex justify-center items-center">
        <div style={{ width: "80%", height: "90%" }} className="bg-white p-4 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mt-2">
              {id ? "Editar Proveedor" : "Registro de Proveedores"}
            </h1>

            <div style={{ marginTop: "2rem" }} className="mb-6 flex justify-center">
              <div className="w-1/3 pr-4 mt-40 mx-20">
                <label htmlFor="cedula" className="block text-gray-600">Cedula</label>
                <input
                  type="text"
                  id="Cedula"
                  name="Cedula"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 ${errors.Cedula ? 'border-red-500' : ''}`}
                  value={formData.Cedula}
                  onChange={handleInputChange}
                />
                {errors.Cedula && <p className="text-red-500 text-sm mt-1">{errors.Cedula}</p>}
              </div>
              <div className="w-1/3 pl-4 mt-40 mx-20">
                <label htmlFor="nombre" className="block text-gray-600">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="Nombre"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 ${errors.Nombre ? 'border-red-500' : ''}`}
                  value={formData.Nombre}
                  onChange={handleInputChange}
                />
                {errors.Nombre && <p className="text-red-500 text-sm mt-1">{errors.Nombre}</p>}
              </div>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="w-1/3 pr-4 mt-10 mx-20">
                <label htmlFor="telefono" className="block text-gray-600">Teléfono</label>
                <input
                  type="text"
                  id="telefono"
                  name="Telefono"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 ${errors.Telefono ? 'border-red-500' : ''}`}
                  value={formData.Telefono}
                  onChange={handleInputChange}
                />
                {errors.Telefono && <p className="text-red-500 text-sm mt-1">{errors.Telefono}</p>}
              </div>
              <div className="w-1/3 pl-4 mt-9 mx-20">
                <label htmlFor="ciudad" className="block text-gray-600">Ciudad</label>
                <input
                  type="text"
                  id="ciudad"
                  name="Ciudad"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 ${errors.Ciudad ? 'border-red-500' : ''}`}
                  value={formData.Ciudad}
                  onChange={handleInputChange}
                />
                {errors.Ciudad && <p className="text-red-500 text-sm mt-1">{errors.Ciudad}</p>}
              </div>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="w-1/3 pr-4 mt-10 mx-20">
                <label htmlFor="email" className="block text-gray-600">Email</label>
                <input
                  type="text"
                  id="email"
                  name="Email"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 ${errors.Email ? 'border-red-500' : ''}`}
                  value={formData.Email}
                  onChange={handleInputChange}
                />
                {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email}</p>}
              </div>
            </div>

            <div className="flex justify-center mt-40">
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 px-6 rounded-md focus:outline-none mx-20 focus:ring focus:border-blue-300"
              >
                {id ? "Guardar Cambios" : "Confirmar"}
              </button>
              <Link
                to="/supplier"
                className="bg-yellow-500 text-white py-2 px-6 rounded-md ml-6 mx-20"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
