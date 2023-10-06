import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Importa los iconos de react-icons
import Menu from '../components/Menu';
import { useFetch } from '../hooks/useFetch';

function M_Shopping({ handleSubmit, errors, id }) {
  const { data: proveedores, loading: loadingProveedores } = useFetch({ url: 'http://localhost:4003/api/supplier' });
  const { data: insumos, loading: loadingInsumos } = useFetch({ url: 'http://localhost:4003/api/detail-shopping' });

  const [selectedProveedor, setSelectedProveedor] = useState('');
  const [selectedInsumos, setSelectedInsumos] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [valor, setValor] = useState(0);
  const [total, setTotal] = useState(0);
  const [insumosTable, setInsumosTable] = useState([]);

  const handleAgregarInsumo = () => {
    if (selectedInsumos && cantidad > 0 && valor > 0) {
      const totalInsumo = cantidad * valor;
      setInsumosTable([
        ...insumosTable,
        {
          insumo: selectedInsumos,
          cantidad,
          valor,
          total: totalInsumo,
        },
      ]);
      setTotal(total + totalInsumo);
      setSelectedInsumos('');
      setCantidad(1);
      setValor(0);
    } else {
      alert('Completa todos los campos correctamente.');
    }
  };

  const handleIncrement = () => {
    setCantidad(cantidad + 1);
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  useEffect(() => {
    console.log('Proveedores:', proveedores);
  }, [proveedores]);

  useEffect(() => {
    console.log('Insumos:', insumos);
  }, [insumos]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours()}:${(currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()}`;
  const fechaActual = `${formattedDate} ${formattedTime}`;

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-64">
        <Menu />
      </div>

      <div className="bg-ECECEC flex-grow min-h-screen flex justify-center items-center">
        <div style={{ width: '80%', height: '90%' }} className="bg-white p-4 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Registro de compras</h1>
              <div className="text-gray-500">{fechaActual}</div>
            </div>

            <div className="mb-4 mt-10">
              <label className="block text-sm font-medium text-gray-700">Proveedor:</label>
              <select
                className="mt-1 p-2 border border-gray-300 rounded-md w-600"
                onChange={(e) => setSelectedProveedor(e.target.value)}
                value={selectedProveedor}
              >
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.ID_PROVEEDOR} value={proveedor.ID_PROVEEDOR}>
                    {proveedor.Nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 mt-10">
              <label className="block text-sm font-medium text-gray-700">Insumo:</label>
              <select
                className="mt-1 p-2 border border-gray-300 rounded-md w-600"
                onChange={(e) => setSelectedInsumos(e.target.value)}
                value={selectedInsumos}
              >
                <option value="">Seleccione un insumo</option>
                {insumos.map((insumo) => (
                  <option key={insumo.ID_INSUMOS} value={insumo.ID_INSUMOS}>
                    {insumo.Nombre_Insumo}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Cantidad:</label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  onClick={handleDecrement}
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  className="ml-3 mt-1 p-2 border border-gray-300 rounded-md w-600"
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value))}
                />
                <button
                  type="button"
                  className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  onClick={handleIncrement}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Valor:</label>
              <input
                type="number"
                className="mt-1 p-2 border border-gray-300 rounded-md w-600"
                value={valor}
                onChange={(e) => setValor(parseFloat(e.target.value))}
              />
            </div>

            <button
              type="button"
              onClick={handleAgregarInsumo}
              className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              agregar
           </button>

           

            <table className="mt-6 w-full">
              <thead>
                <tr>
                  <th className="py-2">Insumo</th>
                  <th className="py-2">Cantidad</th>
                  <th className="py-2">Valor Unitario</th>
                  <th className="py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {insumosTable.map((insumo, index) => (
                  <tr key={index}>
                    <td className="py-2">{insumo.insumo}</td>
                    <td className="py-2">{insumo.cantidad}</td>
                    <td className="py-2">{insumo.valor}</td>
                    <td className="py-2">{insumo.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <button
              type="button"
              onClick={handleAgregarInsumo}
              className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              confirmar compra
           </button>

          



            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Total: ${total.toFixed(2)}</label>
            </div>

            {/* Resto de tu formulario */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default M_Shopping;