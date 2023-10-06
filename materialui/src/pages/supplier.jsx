import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import { BiSolidEdit } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsToggleOff } from 'react-icons/bs';

function Supplier() {
  const { data, loading } = useFetch({ url: 'http://localhost:4003/api/supplier' });
  const [providers, setProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading) {
      const providersWithInitialHabilitado = data.map(provider => ({
        ...provider,
        habilitado: true,
      }));
      setProviders(providersWithInitialHabilitado);
    }
  }, [data, loading]);

  const handleToggleClick = async (id) => {
    const updatedProvider = providers.find((provider) => provider.ID_PROVEEDOR === id);

    if (updatedProvider && updatedProvider.habilitado) {
      try {
        await fetch(`http://localhost:4003/api/supplier/${id}`, {
          method: 'PATCH',
        });

        const updatedProviders = providers.map(provider => {
          if (provider.ID_PROVEEDOR === id) {
            return { ...provider, habilitado: false };
          }
          return provider;
        });

        setProviders(updatedProviders);
      } catch (error) {
        console.error('Error al cambiar el estado del proveedor:', error);
        const updatedProviders = providers.map(provider => {
          if (provider.ID_PROVEEDOR === id) {
            return { ...provider, habilitado: true };
          }
          return provider;
        });

        setProviders(updatedProviders);
      }
    }
  };

  const isSaveButtonDisabled = !providers.some(provider => provider.habilitado);

  const handleSearch = () => {
    const filteredProviders = data.filter((provider) => {
      const searchableFields = [
        provider.Nombre,
        provider.Cedula,
        provider.Telefono,
        provider.Ciudad,
        provider.Email,
      ];

      return searchableFields.some((field) =>
      typeof field === 'string' && field.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setProviders(filteredProviders);
  };

  // Manejar cambios en el término de búsqueda en tiempo real
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex">
      <div className="w-64">
        <Menu />
      </div>
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-4 ml-6 mt-7">Proveedores</h1>
        <div className="ml-auto mr-4 mb-4">
          <Link
            to="/create-supplier"
            className="bg-orange-500 text-white py-2 px-4 rounded-md ml-8 "
          >
            Crear Proveedor
          </Link>
          <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex items-center justify-end"
        >
          <input
            type="text"
            placeholder="Buscar proveedores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none mr-40"
          />
        </form>
        </div>
        {loading ? (
          <h1 className="text-4xl font-bold mb-4">Cargando...</h1>
        ) : (
          <div className="w-3/4 mx-auto mb-20 mt-60">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Cedula</th>
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Nombre</th>
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Telefono</th>
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Ciudad</th>
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Email</th>
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Estado</th>
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {providers.map((provider) => (
                  <tr key={provider.ID_PROVEEDOR}>
                    <td className="w-1/7 border border-gray-600 p-2">{provider.Cedula}</td>
                    <td className="w-1/7 border border-gray-600 p-2">{provider.Nombre}</td>
                    <td className="w-1/7 border border-gray-600 p-2">{provider.Telefono}</td>
                    <td className="w-1/7 border border-gray-600 p-2">{provider.Ciudad}</td>
                    <td className="w-1/7 border border-gray-600 p-2">{provider.Email}</td>
                    <td className={`w-1/7 border border-gray-600 p-2 ${provider.habilitado ? 'text-green-600' : 'text-red-600'}`}>
                      {provider.habilitado ? 'Habilitado' : 'Deshabilitado'}
                    </td>
                    <td className="w-1/7 border border-gray-600 p-2 text-center">
                      <div className="flex justify-center">
                        <Link to={`/edit-supplier/${provider.ID_PROVEEDOR}`}>
                          <BiSolidEdit className={`text-2xl mx-2 ${!provider.habilitado ? 'text-gray-400 cursor-not-allowed' : ''}`} />
                        </Link>
                        
                        <Link
                         to={`/supplierV/${provider.ID_PROVEEDOR}`}>
                        
                          <AiOutlineEye className={`text-2xl mx-2 ${!provider.habilitado ? 'text-gray-400 cursor-not-allowed' : ''}`} />
                        </Link>
                        <span
                          className={`cursor-pointer ${provider.habilitado ? 'text-green-600' : 'text-red-600'}`}
                          onClick={() => handleToggleClick(provider.ID_PROVEEDOR)}
                        >
                          <BsToggleOff className="text-2xl mx-2" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 ml-6">
              <p className="text-red-600">
                {isSaveButtonDisabled && 'No se pueden guardar cambios si todos los proveedores están deshabilitados.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Supplier;
