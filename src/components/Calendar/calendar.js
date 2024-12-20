import React, { useState, useEffect } from 'react';  
import CreateEventModal from '../EventModal/CreateEventModal';
import EditEventModal from '../EventModal/EditEventModal'
import logo from "../../assets/images/logo.png";
import { listEvents, deleteEvent } from '../../axios';
import './calendar.css'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false); // Controle do modal específico do evento
  const [month, setMonth] = useState(0);  // Janeiro (0 = Janeiro)
  const [year, setYear] = useState(2021);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

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
   const openEventDetailModal = (event) => {
    setSelectedEvent(event); // Define o evento selecionado
    setIsEventDetailModalOpen(true); // Abre a modal
  };

  const closeEventDetailModal = () => {
    setSelectedEvent(null); // Limpa o evento selecionado
    setIsEventDetailModalOpen(false); // Fecha a modal
  };

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

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este evento?");
    
    if (!confirmDelete) {
      return; // Se o usuário cancelar, interrompa a execução
    }
  
    try {
      // Chama a API para deletar o evento
      const response = await deleteEvent(eventId);
      if (response.success) {
        // Atualiza a lista de eventos removendo o evento deletado
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        alert("Evento excluído com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar o evento:", error);
      alert("Não foi possível excluir o evento.");
    }
  };

  /*Listando os eventos*/
  const [events, setEvents] = useState([]);
  const [eventsCalendar, setEventsCalendar] = useState([])

  useEffect(() => {
      const fetchEvents = async () => {
          try {
              const data = await listEvents();

              const formattedEvents = data.map((event) => ({
                id: event.id,
                title: event.title,
                start: event.dateInitial,
                end: event.dateFinal,
                extendedProps: {
                  location: event.location,
                  description: event.description,
                },
              }));
              
              setEventsCalendar(formattedEvents);
              setEvents(data);
          } catch (error) {
              console.error('Erro ao buscar eventos:', error.message);
          }
      };

      fetchEvents();
  }, []);

  function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Garante 2 dígitos para o dia
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`; // Retorna no formato dd/mm/yyyy
  }

  const handleEventClick = (clickInfo) => {
    openEventDetailModal(clickInfo.event.extendedProps);
  };

  // Handler para clique em data
  const handleDateClick = (info) => {
    openCreateEventModal();
  };

  const openEditModal = (event) => {
    setEventToEdit(event); // Define o evento a ser editado
    setIsEditModalOpen(true); // Abre a modal
  };

  const closeEditModal = () => {
    setEventToEdit(null); // Reseta o evento selecionado
    setIsEditModalOpen(false); // Fecha a modal
  };
  

  return (
    <div className="min-h-screen flex flex-col caret-transparent">
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
              </div>
            </div>
            <button
              onClick={openCreateEventModal}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Criar evento
            </button>
          </div>

          {/* Atividades do Dia */}
          <div className="bg-white h-72 p-4 rounded-lg shadow-md mb-4 flex flex-col">
            <h3 className="font-bold mb-2">Atividades do dia de hoje ({getCurrentDate()})</h3>
              <div className='overflow-y-auto'>
                {/*Listagem de eventos*/}
                {events.filter((event) => {
                // Obter a data atual no formato 'YYYY-MM-DD'
                const today = new Date().toISOString().split('T')[0];

                // Filtrar os eventos pela data atual
                const eventDate = event.dateInitial.split('T')[0]; // Ajuste baseado no formato de dateInitial
                return eventDate === today;
                })
                .map((event) => (
                  <div
                    key={event.id} // Certifique-se de que cada evento tenha um ID único
                    className="bg-red-100 p-2 rounded-lg mb-2 cursor-pointer"
                    onClick={() => openEventDetailModal(event)} // Define o evento ao clicar
                  >
                    <p className="text-red-500 font-bold">{event.title}</p>
                    <p className="text-red-500 font-bold">{`${new Date(event.dateInitial).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.dateFinal).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</p>
                    <p className="text-red-500">{event.location}</p>
                  </div>
              ))}
              </div>
              <p onClick={openModal} className='self-end cursor-pointer underline'>ver todos os eventos</p>
          </div>

          {/* Próximos Eventos */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold mb-2">Próximos eventos ou eventos posteriores</h3>
            <ul>
              {events.filter((event) => {
                // Obter a data atual no formato 'YYYY-MM-DD'
                const today = new Date().toISOString().split('T')[0];

                // Filtrar os eventos pela data atual
                const eventDate = event.dateInitial.split('T')[0]; // Ajuste baseado no formato de dateInitial
                return eventDate !== today;
                })
                .map((event) => (
                  <li 
                    onClick={() => openEventDetailModal(event)}
                    key={event.id} className="bg-gray-200 p-2 rounded-lg mb-2 cursor-pointer flex justify-between"
                  >
                    {event.title}
                  </li>
              ))}
            </ul>
          </div>
        </aside>

      {/* Calendário */}
      <section className="flex-1 ml-8">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={eventsCalendar}
            eventClick={handleEventClick} // Clique em evento para abrir detalhes
            contentHeight={700} // Altura máxima
            aspectRatio={1.2} // Reduz a largura proporcionalmente    
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek',
            }}
            locale="pt-br" // Configurar idioma
            editable={true} // Permite mover eventos
            eventContent={(arg) => (
              <div className='truncate'>
                <i>{arg.event.title}</i>
              </div>
            )}
            dayCellClassNames={(date) => {
              const today = new Date().toISOString().split('T')[0];
              if (date.dateStr === today) {
                return 'bg-warning'; // Cor de fundo para o dia atual
              }
              return '';
            }}
          />
        </div>
      </section>
      </main>

      {/* Modal de Detalhes do Evento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-z-index">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 max-w-4xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Atividades do dia</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Listagem de eventos */}
            <div className="flex flex-col space-y-4 overflow-y-auto h-96">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id} // Identificador único para cada evento
                    className="bg-red-100 p-4 rounded-lg cursor-pointer hover:bg-red-200 transition flex justify-between items-center"
                  >
                    <div onClick={() => openEventDetailModal(event)}>
                      <p className="text-red-600 font-bold text-lg">{event.title}</p>
                      <p className="text-gray-700 mt-2">
                        <strong>Data:</strong>{' '}
                        {new Date(event.dateInitial).toLocaleDateString()} -{' '}
                        {new Date(event.dateFinal).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 mt-2">
                        <strong>Horário:</strong>{' '}
                        {`${new Date(event.dateInitial).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.dateFinal).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      </p>
                      <p className="text-gray-700 mt-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-500 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a1 1 0 0 1-.707-.293l-5-5a7 7 0 1 1 9.414 0l-5 5A1 1 0 0 1 10 18zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {event.location || 'Local não informado'}
                      </p>
                    </div>
                    <div>
                      <button
                        className="z-index:6 p-3 rounded-md black mr-2 hover:underline"
                        onClick={() => openEditModal(event)}
                      >
                        Editar
                      </button>
                      <button
                        className='z-index:6 bg-red-500 p-3 rounded-md text-white hover:bg-red-400'
                        onClick={() => handleDeleteEvent(event.id)}
                      > 
                        Apagar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 text-center">Nenhum evento encontrado.</p>
              )}
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
      {isEventDetailModalOpen && selectedEvent && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center modal-z-index">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-1/4 max-w-4xl relative">
            <button onClick={closeEventDetailModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            {/* Exibição da Data com Condicional */}
            <p className="text-gray-700">
              <strong>Data:</strong>{' '}
              {selectedEvent.dateInitial && selectedEvent.dateFinal
                ? new Date(selectedEvent.dateInitial).toLocaleDateString() ===
                  new Date(selectedEvent.dateFinal).toLocaleDateString()
                  ? new Date(selectedEvent.dateInitial).toLocaleDateString() // Única data
                  : `${new Date(selectedEvent.dateInitial).toLocaleDateString()} - ${new Date(selectedEvent.dateFinal).toLocaleDateString()}` // Intervalo de datas
                : 'Data não informada'}
            </p>

            {/* Exibição do Horário com Fallback */}
            <p className="text-gray-700">
              <strong>Horário:</strong>{' '}
              {selectedEvent.dateInitial && selectedEvent.dateFinal
                ? `${new Date(selectedEvent.dateInitial).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(selectedEvent.dateFinal).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : 'Horário não informado'}
            </p>
            <p className="text-gray-700"><strong>Local:</strong> {selectedEvent.location}</p>
            <p className="text-gray-700 mt-4">{selectedEvent.description}</p>
          </div>
        </div>
      )}

      {/* Modal para Criar Evento */}
      <CreateEventModal isOpen={isCreateEventModalOpen} onClose={closeCreateEventModal} />

      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        eventToEdit={eventToEdit}
      />

      {/* Rodapé */}
      <footer className="p-4 text-center">
        AcademiaConnect© Feito por alunos da UDF
      </footer>
    </div>
  );
};

export default Calendar;