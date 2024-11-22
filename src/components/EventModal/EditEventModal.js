import React, { useState, useEffect } from 'react';
import { updateEvent } from '../../axios'; // Importe a função da API para atualizar eventos

const EditEventModal = ({ isOpen, onClose, eventToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  // Pré-preencher os campos com os dados do evento ao abrir a modal
  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title || '');
      setDescription(eventToEdit.description || '');
      setStartDate(eventToEdit.dateInitial?.split('T')[0] || '');
      setStartTime(eventToEdit.dateInitial?.split('T')[1]?.slice(0, 5) || '');
      setEndDate(eventToEdit.dateFinal?.split('T')[0] || '');
      setEndTime(eventToEdit.dateFinal?.split('T')[1]?.slice(0, 5) || '');
      setLocation(eventToEdit.location || '');
    }
  }, [eventToEdit]);

  // Função para salvar as alterações
  const handleSave = async () => {
    const updatedEvent = {
      title,
      description,
      dateInitial: `${startDate}T${startTime}:00Z`,
      dateFinal: `${endDate}T${endTime}:00Z`,
      location,
    };

    try {
      await updateEvent(eventToEdit.id, updatedEvent); // Chama a API para atualizar o evento
      alert('Evento atualizado com sucesso!');
      onClose(); // Fecha a modal após salvar
    } catch (error) {
      console.error('Erro ao atualizar o evento:', error);
      alert('Erro ao atualizar o evento. Tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center caret-current modal-z-index">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          &times;
        </button>
        <h2 className="text-3xl font-extrabold mb-6">Editar evento</h2>

        <form className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título do evento</label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Data Inicial</label>
                <input
                  type="date"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700">Horário</label>
                <input
                  type="time"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Data Final</label>
                <input
                  type="date"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700">Horário</label>
                <input
                  type="time"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Localização</label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição do evento</label>
            <textarea
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md resize-none"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="col-span-2 flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
