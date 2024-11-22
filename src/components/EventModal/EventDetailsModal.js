// EventDetailsModal.js
import React from 'react';

const EventDetailsModal = ({ activity, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-z-index">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 max-w-4xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{activity.title}</h2>
        <p className="text-gray-600 flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a1 1 0 0 1-.707-.293l-5-5a7 7 0 1 1 9.414 0l-5 5A1 1 0 0 1 10 18zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clipRule="evenodd" />
          </svg>
          <span className="font-bold mr-2">Local:</span>{activity.location}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Data:</strong> {activity.date}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Horário:</strong> {activity.time}
        </p>
        <p className="text-gray-600 mb-4">{activity.description}</p>
      </div>
    </div>
  );
};

export default EventDetailsModal;
