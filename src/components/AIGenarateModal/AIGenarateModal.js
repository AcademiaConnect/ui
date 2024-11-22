import React, { useState } from 'react';

const AIGenerateModal = ({ isOpen, onClose, onGenerate }) => {
  const [inputText, setInputText] = useState('');

  const handleGenerate = () => {
    onGenerate(inputText);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-z-index">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          &times;
        </button>
        <h2 className="text-2xl font-extrabold mb-4">Gerar evento com IA</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Dica</label>
          <p className="p-2 bg-gray-100 border border-gray-300 rounded-md text-sm">
            Para obter o máximo de resultado, recomendamos utilizar um texto padrão, por exemplo:
            <br />
            <i>Irei fazer um evento no dia 20/09/2020, da 19h até 18h. Será um evento sobre Python. Gere um título e uma descrição sobre Python.</i>
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do evento</label>
          <textarea
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md resize-none"
            rows="4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Descrição"
          />
        </div>

        <button
          onClick={handleGenerate}
          className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Gerar
        </button>
      </div>
    </div>
  );
};

export default AIGenerateModal;
