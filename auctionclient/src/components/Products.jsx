import React, { useEffect, useState } from 'react'
import AddProduct from './AddProduct';

const Products = () => {
	const [productos, setProductos] = useState([]);
	const [showAddModal, setShowAddModal] = useState(false);

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  useEffect(() => {
    // Función para obtener la lista de productos
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/productos', {
        	method: 'GET',
	        headers: {
  	        'Content-Type': 'application/json',
    	    }
      	});
				if(response.ok){
					const data = await response.json();
					console.log(data);
					setProductos(data); // Actualizar el estado con los productos obtenidos del servidor
				}
        
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    };

    fetchProductos(); // Llamar a la función al cargar el componente
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
      <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={handleAddClick}>Crear Producto</button>
			{showAddModal && <AddProduct onClose={handleCloseModal} />}
      <ul className="divide-y divide-gray-200">
        {productos.map((producto) => (
          <li key={producto.id} className="py-4">
            <div>
              <p className="text-lg font-bold">{producto.productname}</p>
              <p className="text-sm text-gray-500">{producto.description}</p>
              <p className="text-sm text-gray-500">Precio: ${producto.price}</p>
							<p className="text-sm text-gray-500">Precio de subasta: ${producto.saleprice}</p>
              <p className="text-sm text-gray-500">ID Usuario: {producto.idUser}</p>
            </div>
            <div className="mt-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2" onClick={() => handleEdit(producto.id)}>Editar</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => handleDelete(producto.id)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Products