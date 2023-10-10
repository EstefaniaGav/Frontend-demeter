import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../components/Menu';
import { useFetch } from '../hooks/useFetch';

function ShoppingView() {
  const { id } = useParams();
  const { data: compra, loading } = useFetch({ url: `http://localhost:4003/api/shopping/${id}` });

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  async function fetchData(id) {
    // Lógica para obtener los datos de la compra
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!compra) {
    return <div>Compra no encontrada</div>;
  }

  const proveedorNombre = compra?.PROVEEDORE?.Nombre; // Acceder a la propiedad Nombre de PROVEEDORE
  const detalles = compra?.Detalles || [];
  console.log(compra)

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-64">
        <Menu />
      </div>

      <div className="bg-ECECEC flex-grow min-h-screen flex justify-center items-center">
        <div style={{ width: '50%', height: '50%' }} className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 mt-5">Detalles de la compra</h1>
            <h2 className="mt-3">Fecha: {compra.Fecha_Compra}</h2>
            <h2 className="mt-3">Proveedor: {proveedorNombre}</h2>
            <h2 className="mt-3">insumo:  {compra.Nombre_Insumo}</h2>
            <h2 className="mt-3">cantidad: </h2>
            <h2 className="mt-3">Valor: {compra.Valor_Compra}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingView;
