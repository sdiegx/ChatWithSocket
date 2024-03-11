import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';

const Login = ({ id, setId, username, setUsername, password, setPassword }) => {
  
	const navigate = useNavigate();
  const [error, setError] = useState('');
	const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleCloseModal = () => {
    setShowRegisterModal(false);
  };

  const handleLogin = async e => {
		e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // El inicio de sesión fue exitoso, redirige al usuario a la página de productos
        const data = await response.json();
        setId(data.userId);
        console.log(data.userId);
				navigate('/menu');
      } else {
        setError('Credenciales inválidas. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      // setError('Hubo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="max-w-md w-full p-8 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
      </form>
      <div className="mb-4">
        <span className="text-blue-600 cursor-pointer" onClick={handleRegisterClick}>Registrate!</span>
        {showRegisterModal && <Register onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default Login;
