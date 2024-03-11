import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="p-8 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Menu</h2>
        <Link to="/products">
          <button className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Gestionar Productos</button>
        </Link>
        <Link to="/auctions">
          <button className="block w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Subastas</button>
        </Link>
        <Link to="/auctions-manager">
          <button className="block w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Gestionar subastas</button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;