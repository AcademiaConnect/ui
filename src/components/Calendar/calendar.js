import React, { useState } from 'react';
import logo from "../../assets/images/logo.png";

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const month = 0; // Janeiro (0 = Janeiro)
  const year = 2021;
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Dia da semana do primeiro dia do mês
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Número de dias no mês

  const activityDay = 5;

  // Criando as células do calendário
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<td key={`empty-${i}`} className="p-4"></td>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(
      <td
        key={day}
        className={`p-4 h-20 w-20 text-center border rounded-lg ${
          day === activityDay ? "bg-red-100 text-red-600 font-bold cursor-pointer" : "bg-gray-100"
        }`}
        onClick={day === activityDay ? openModal : null}
      >
        {day}
        {day === activityDay && (
          <p className="text-xs mt-1">Encontro Tech</p>
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-purple-500 p-4 flex justify-between items-center">
        <div className="w-7 h-10 rounded-full flex items-center justify-center">
          <img src={logo}/>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>

        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="bg-gray-200 flex flex-1 p-8">
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
            <h3 className="font-bold mb-2">Atividades do dia de hoje (05/01/2021)</h3>
            <div className="bg-red-100 p-2 rounded-lg mb-2">
              <p className="text-red-500 font-bold">9:30 - 12:00</p>
              <button onClick={openModal} className="text-red-500">Encontro Tech - 1ª Ed.</button>
              <p className="text-red-500">Edifício Sede - UDF</p>
            </div>
            <a href="#" className="text-blue-500">Ver todas</a>
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
          <h1 className="text-3xl font-bold mb-4">Janeiro/2021</h1>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Encontro Tech - 1ª Ed.</h2>
            <p><strong>Data:</strong> 06/01/2024</p>
            <p><strong>Horário:</strong> 9:30 - 12:00</p>
            <p><strong>Localização:</strong> Edifício Sede - UDF</p>
            <h3 className="mt-4 font-bold">Descrição:</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      )}

      {/* Rodapé */}
      <footer className="bg-white p-4 text-center">
        Feito por alunos da UDF
      </footer>
    </div>
  );
};

export default Calendar;
