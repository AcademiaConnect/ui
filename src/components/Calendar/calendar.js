import React, { useState } from 'react';  
import CreateEventModal from '../EventModal/CreateEventModal';
import logo from "../../assets/images/logo.png";

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false); // Controle do modal específico do evento

  const [month, setMonth] = useState(0);  // Janeiro (0 = Janeiro)
  const [year, setYear] = useState(2021);

  // Funções para controlar o modal de detalhes da atividade
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Funções para controlar o modal de criação de evento
  const openCreateEventModal = () => {
    closeModal(); // Fechar o modal de detalhes antes de abrir o modal de criação de evento
    setIsCreateEventModalOpen(true);
  };
  const closeCreateEventModal = () => setIsCreateEventModalOpen(false);

   // Funções para controlar o modal de detalhes do evento específico
   const openEventDetailModal = () => setIsEventDetailModalOpen(true);
   const closeEventDetailModal = () => setIsEventDetailModalOpen(false);


  // Dados para a atividade do dia
  const activity = {
    date: "05/01/2021",
    title: "Encontro Tech - 1ª Ed.",
    time: "9:30 - 12:00",
    location: "Edifício Sede - UDF",
    description: "Uma palestra sobre tecnologias emergentes.",
  };


  // A data de atividade será convertida corretamente
  const activityDate = new Date(
  `${activity.date.split("/")[2]}-${activity.date.split("/")[1]}-${activity.date.split("/")[0]}`
);

  const activityMonth = activityDate.getMonth(); // Mês do evento (0 - Janeiro, 1 - Fevereiro, etc.)
  const activityDay = 5;   // Dia do evento (5)
  

  // Calcular o primeiro dia do mês e o número de dias no mês
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Dia da semana do primeiro dia do mês
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Número de dias no mês

  // Calcular o offset correto (considerando que a semana começa na segunda-feira)
const offset = (firstDayOfMonth + 6) % 7; // Ajusta para começar na segunda-feira (índice 1)
  
  // Criando as células do calendário
  const calendarCells = [];
  for (let i = 0; i < offset; i++) {
    calendarCells.push(<td key={`empty-${i}`} className="p-4"></td>);
  }


  for (let day = 1; day <= daysInMonth; day++) {
    const isEventDay = (month === activityMonth && day === activityDay); // Correção aqui
    
    calendarCells.push(
      <td
        key={day}
        className={`p-4 h-20 w-20 text-center border rounded-lg ${
          isEventDay ? 'bg-red-100 text-red-600 font-bold cursor-pointer' : 'bg-gray-100'
        }`}
        onClick={isEventDay ? openModal : null}
      >
        {day}
        {isEventDay && (
          <p className="text-xs mt-1">Encontro Tech</p> // Certifique-se que este elemento está sendo renderizado
        )}
      </td>
    );
  }
  



  // Dividindo as células em linhas de 7 dias
  const rows = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    rows.push(
      <tr key={`row-${i / 7}`} className="text-center">
        {calendarCells.slice(i, i + 7)}
      </tr>
    );
  }


   // Função para avançar para o próximo mês
const goToNextMonth = () => {
  setMonth((prevMonth) => {
    if (prevMonth === 11) {
      setYear((prevYear) => prevYear + 1);  // Aumenta o ano se for dezembro
      return 0;  // Janeiro
    } else {
      return prevMonth + 1;  // Avança para o próximo mês
    }
  });
};

  // Função para voltar para o mês anterior
const goToPreviousMonth = () => {
  setMonth((prevMonth) => {
    if (prevMonth === 0) {
      setYear((prevYear) => prevYear - 1);  // Decremente o ano se for janeiro
      return 11;  // Dezembro
    } else {
      return prevMonth - 1;  // Retrocede para o mês anterior
    }
  });
};

   // Nome dos meses
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];


  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-purple-500 p-4 flex justify-between items-center">
        <div className="w-7 h-10 rounded-full flex items-center justify-center">
          <img src={logo} alt="Logo" />
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="bg-gray-100 flex flex-1 p-8">
        <aside className="w-1/4">
          {/* Informações do Aluno */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-4">
              <img src="https://placehold.co/50x50" alt="Profile picture" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h2 className="font-bold">Paulinho da Serra</h2>
                <p>Ciência da computação</p>
                <p>8º Semestre</p>
                <p>Aluno</p>
              </div>
            </div>
            <h3 className="font-bold mb-2">Matérias matriculadas:</h3>
            <ul className="list-disc list-inside">
              <li>Ciência de dados e aprendizado de máquina</li>
              <li>Paradigmas de Linguagem de Programação</li>
              <li>Inglês Básico</li>
              <li>Big Data</li>
            </ul>
          </div>

          {/* Atividades do Dia */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="font-bold mb-2">Atividades do dia de hoje ({activity.date})</h3>
            <div className="bg-red-100 p-2 rounded-lg mb-2">
              <p className="text-red-500 font-bold">{activity.time}</p>
              <button onClick={openModal} className="text-red-500">{activity.title}</button>
              <p className="text-red-500">{activity.location}</p>
            </div>
          </div>

          {/* Próximos Eventos */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold mb-2">Próximos eventos: 10/01, 11/01, 13/01</h3>
            <ul>
              <li className="bg-gray-200 p-2 rounded-lg mb-2">Encontro Tech - 1ª Ed.</li>
              <li className="bg-gray-200 p-2 rounded-lg mb-2">Encontro Tech - 2ª Ed.</li>
              <li className="bg-gray-200 p-2 rounded-lg">Encontro Tech - 3ª Ed.</li>
            </ul>
          </div>
        </aside>

       {/* Calendário */}
      <section className="flex-1 ml-8">
        <div className="flex justify-between items-center mb-4">
          <button onClick={goToPreviousMonth} className="p-2 bg-gray-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold">{`${monthNames[month]}/${year}`}</h1>
          <button onClick={goToNextMonth} className="p-2 bg-gray-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <table className="w-full bg-white rounded-lg shadow-md border-collapse mb-8">
          <thead>
            <tr>
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <th key={day} className="p-4 font-semibold text-gray-700 border-b border-gray-300">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </section>
      </main>

      {/* Modal de Detalhes do Evento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-1/4 max-w-4xl relative flex flex-col">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Atividade do dia ({activity.date})</h2>
            <div className="flex space-x-4 flex-1">
              <div
                className="bg-red-100 p-4 rounded-lg h-3/5 w-2/4 max-w-xs cursor-pointer"
                onClick={openEventDetailModal}
              >
                <p className="text-red-600 font-bold text-lg">{activity.title}</p>
                <p className="text-gray-700 mt-2"><strong>Horário:</strong> {activity.time}</p>
                <p className="text-gray-700 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a1 1 0 0 1-.707-.293l-5-5a7 7 0 1 1 9.414 0l-5 5A1 1 0 0 1 10 18zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clipRule="evenodd" />
                  </svg>
                  {activity.location}
                </p>
              </div>
            </div>
            {/* Botão Criar Evento no canto inferior direito */}
            <div className="flex justify-end mt-6">
              <button
                onClick={openCreateEventModal}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Criar evento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Informações Específicas do Evento */}
      {isEventDetailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-1/4 max-w-4xl relative">
            <button onClick={closeEventDetailModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{activity.title}</h2>
            <p className="text-gray-700"><strong>Data:</strong> {activity.date}</p>
            <p className="text-gray-700"><strong>Horário:</strong> {activity.time}</p>
            <p className="text-gray-700"><strong>Local:</strong> {activity.location}</p>
            <p className="text-gray-700 mt-4">{activity.description}</p>
          </div>
        </div>
      )}

      {/* Modal para Criar Evento */}
      <CreateEventModal isOpen={isCreateEventModalOpen} onClose={closeCreateEventModal} />

      {/* Rodapé */}
      <footer className="bg-white p-4 text-center">
        Feito por alunos da UDF
      </footer>
    </div>
  );
};

export default Calendar;

