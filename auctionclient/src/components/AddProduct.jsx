import React, { useEffect, useState } from 'react'

const AddProduct = ({ onClose }) => {
  const [product, setProduct] = useState({
    productname: '',
    description: '',
    price: 0,
		saleprice: 0,
    idUser: null
  });
	const [usuarios, setUsuarios] = useState([]);

	const getUsers = async () => {
		try {
			const response = await fetch('http://localhost:8080/api/usuarios', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			if (response.ok) {
				const data = await response.json();
				setUsuarios(data);
			} else {
				console.log('No llegan la lista de usuarios');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
	useEffect(() => {
		getUsers();
	}, [])
	

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async e => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8080/api/productos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( product ),
        });
        if (response.ok) {
          console.log('Producto registrado');
					onClose();
        } else {
          console.log('Usuario no registrado');
        }
      } catch (error) {
        console.error('Error:', error);
      }
     
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre:</label>
          <input type="text" name="productname" value={product.productname} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block mb-1">Descripción:</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block mb-1">Precio:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
        </div>
				<div>
          <label className="block mb-1">Precio de subasta:</label>
          <input type="number" name="saleprice" value={product.saleprice} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block mb-1">ID Usuario:</label>
          <select name="idUser" value={product.idUser} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full">
            <option value="">Seleccione un usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>{usuario.username}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Agregar Producto</button>
				<button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2">Cancelar</button>
			</form>
    </div>
  )
}

export default AddProduct