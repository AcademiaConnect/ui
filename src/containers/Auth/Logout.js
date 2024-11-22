import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Enviar a requisição POST para o back-end Django
      await axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true });

      // Remover o token armazenado no localStorage ou sessionStorage
      localStorage.removeItem('authToken'); // Se você armazenou o token aqui
      // Ou sessionStorage.removeItem('authToken');

      // Redirecionar o usuário para a página de login ou página inicial
      window.location.href = '/login';
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Sair
    </button>
  );
};

export default LogoutButton;

