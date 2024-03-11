import React, { useEffect, useState } from 'react'
import AddAuction from './AddAuction';

const ManageAuction = () => {
	const [auctions, setAuctions] = useState([]);
	const [showAddModal, setShowAddModal] = useState(false);

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  useEffect(() => {
    // Función para obtener la lista de productos
    const fetchAuctions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/subastas', {
        	method: 'GET',
	        headers: {
  	        'Content-Type': 'application/json',
    	    }
      	});
				if(response.ok){
					const data = await response.json();
					console.log(data);
					setAuctions(data); // Actualizar el estado con los productos obtenidos del servidor
				}
        
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    };

    fetchAuctions(); // Llamar a la función al cargar el componente
  }, [showAddModal]);

	const handleEdit = (productoId) => {
    // Manejar la edición del producto
    console.log('Editar producto con ID:', productoId);
  };

  const handleDelete = (productoId) => {
    // Manejar la eliminación del producto
    console.log('Eliminar producto con ID:', productoId);
  };

  const handleCreate = () => {
    // Manejar la creación de un nuevo producto
    console.log('Crear nuevo producto');
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Subastas</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={handleAddClick}>Crear Subasta</button>
			{showAddModal && <AddAuction onClose={handleCloseModal} />}
      <ul className="divide-y divide-gray-200">
        {auctions.map((auction) => (
          <li key={auction.id} className="py-4">
            <div>
              <p className="text-lg font-bold">{auction.auctionName}</p>
              <p className="text-sm text-gray-500">Ganador:{auction.idUser}</p>
              <p className="text-sm text-gray-500">Producto: {auction.idProduct}</p>
			    		<p className="text-sm text-gray-500">Precio de subasta: ${auction.saleprice}</p>
            </div>
            <div className="mt-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2" onClick={() => handleEdit(auction.id)}>Editar</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => handleDelete(auction.id)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default ManageAuction