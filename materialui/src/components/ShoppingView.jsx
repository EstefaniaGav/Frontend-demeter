import React from 'react'

function ShoppingView({ handleSubmit, errors }) {
    const { id } = useParams();
  const { data: insumo, loading } = useFetch({ url: `http://localhost:4003/api/detail-shopping/${id}` });

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

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-64">
        <Menu />
      </div>

      <div className="bg-ECECEC flex-grow min-h-screen flex justify-center items-center">
        <div style={{ width: "50%", height: "50%" }} className="bg-white p-4 rounded-lg shadow-md">
          {loading ? (
            <p>Cargando proveedor...</p>
          ) : (
            <div className='text-center'>
              <h1 className="text-3xl font-bold mb-4 mt-5">Detalles de proveedor</h1>
              <h2 className='mt-20'>Cedula: {insumo.Cantidad}</h2>
              <h2 className='mt-3'>Nombre: {insumo.Nombre}</h2>
              <h2 className='mt-3'>Ciudad: {insumo.Ciudad}</h2>
              <h2 className='mt-3'>Telefono: {insumo.Telefono}</h2>
              <h2 className='mt-3'>Email: {provider.Email}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default ShoppingView