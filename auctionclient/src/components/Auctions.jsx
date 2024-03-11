import React, { useState, useEffect } from 'react';

const Auctions = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [responseMessages, setResponseMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081/auction');
    ws.onopen = () => {
      console.log('Conexión WebSocket establecida.');
    };
    ws.onmessage = (event) => {
      const newResponse = event.data;
      setResponseMessages(prevMessages => [...prevMessages, newResponse]);
    };
    ws.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };
    setWebSocket(ws);
  }, []);

  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
  };

  const sendMessage = () => {
    if (webSocket && messageInput) {
      webSocket.send(messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Auction</h1>
      <div className="mb-4">
        <input 
          type="text" 
          value={messageInput} 
          onChange={handleMessageChange} 
          placeholder="Escribe un mensaje..." 
          className="border border-gray-300 rounded-md px-3 py-2 w-64 mr-2" 
        />
        <button 
          onClick={sendMessage} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
      <hr className="my-4" />
      <div>
        <h2 className="text-xl font-bold mb-2">Respuestas del servidor:</h2>
        {responseMessages.map((message, index) => (
          <p key={index} className="mb-1">{message}</p>
        ))}
      </div>
    </div>
  );
}

export default Auctions;
