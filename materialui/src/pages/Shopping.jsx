import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import { BiSolidEdit } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';

function Shopping() {
  const { data, loading } = useFetch({ url: 'http://localhost:4003/api/shopping' });
  const [compras, setCompras] = useState([]); 

  useEffect(() => {
    if (!loading) {
      setCompras(data); 
    }
  }, [data, loading]);

  return (
    <div className="min-h-screen flex">
      <div className="w-64">
        <Menu />
      </div>
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-4 ml-6 mt-7">Compras</h1> 
        <div className="ml-auto mr-4 mb-4">
          <Link
            to="/shoppingM" 
            className="bg-yellow-500 text-white py-2 px-4 rounded-md ml-7"
          >
            Crear Compra
          </Link>
        </div>
        {loading ? (
          <h1 className="text-4xl font-bold mb-4">Cargando...</h1>
        ) : (
          <div className="w-3/4 mx-auto mb-20 mt-60">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Fecha</th> 
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Proveedor</th> 
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Valor</th> 
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Estado</th>
                  <th className="w-1/7 text-sm border border-gray-600 p-2">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
              {compras?.map((compra) => (
                <tr key={compra.ID_COMPRAS}>
                  <td className="w-1/7 border border-gray-600 p-2">{compra.Fecha_Compra}</td>
                  <td className="w-1/7 border border-gray-600 p-2">{compra.Proveedor ? compra.Proveedor.Nombre : 'Proveedor no encontrado'}</td>
                  <td className="w-1/7 border border-gray-600 p-2">{compra.Valor_Compra}</td>
                  <td className={`w-1/7 border border-gray-600 p-2 ${compra.Estado ? 'text-green-600' : 'text-red-600'}`}>
                    {compra.Estado ? 'Habilitado' : 'Deshabilitado'}
                  </td>
                  <td className="w-1/7 border border-gray-600 p-2 text-center">
                    <div className="flex justify-center">
                      <Link to={`/edit-shopping/${compra.ID_COMPRAS}`}> 
                        <BiSolidEdit className="text-2xl mx-2" />
                      </Link>
                      <Link
                        to={{
                          pathname: `/shopping-view/${compra.ID_COMPRAS}`, //ruta temporal
                          state: { compra },
                        }}
                      >
                        <AiOutlineEye className="text-2xl mx-2" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shopping;
