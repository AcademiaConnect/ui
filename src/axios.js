import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

const instance = axios.create({
	// eslint-disable-next-line no-undef
	headers: {
		"Content-Type": "application/json"
	}
});

const instanceFormData = axios.create({
	// eslint-disable-next-line no-undef
	headers: {
		"Content-Type": "multipart/form-data",
	}
});

instanceFormData.interceptors.request.use(config => {
	let token = Cookies.get("tk");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
			.replace(/(^)|($)/g, "");
	}
	return config;
}, err => {
	return Promise.reject(err);
});

instance.interceptors.request.use(config => {
	let token = Cookies.get("tk");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
			.replace(/(^)|($)/g, "");
	}
	return config;
}, err => {
	return Promise.reject(err);
});

export default {
    // ======== AUTENTICATION ========
	GetLogin(data) {
		return instance.post("user/login", data);
	},
	GetUserInfo(data) {
		return instance.get("user/detail", data);
	},
	CreateAccount(data) {
		return instance.post("user/register", data);
	},
};

// Função para criar um evento
export const createEvent = async (eventData) => {
    try {
        const response = await instance.post('events/create/', eventData);
        return response.data; // Retorna os dados do evento criado
    } catch (error) {
        console.error('Erro ao criar evento:', error.response?.data || error.message);
        throw error;
    }
};

// Função para listar eventos
export const listEvents = async () => {
    try {
        const response = await instance.get('events/create/');
        return response.data; // Retorna a lista de eventos
    } catch (error) {
        console.error('Erro ao listar eventos:', error.response?.data || error.message);
        throw error;
    }
};

// Função para atualizar um evento
export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await instance.put(`events/create/${eventId}/`, eventData);
        return response.data; // Retorna os dados atualizados do evento
    } catch (error) {
        console.error('Erro ao atualizar evento:', error.response?.data || error.message);
        throw error;
    }
};

// Função para deletar um evento
export const deleteEvent = async (eventId) => {
    try {
        await instance.delete(`events/create/${eventId}/`);
        return { success: true };
    } catch (error) {
        console.error('Erro ao deletar evento:', error.response?.data || error.message);
        throw error;
    }
};

// Função para auto-completar os detalhes do evento
export const autoCompleteEvent = async (text) => {
	try {
	  const response = await instance.post('/events/auto_complete/', { text });
	  return response.data; // Retorna os dados do evento gerado
	} catch (error) {
	  console.error('Erro ao auto-completar o evento:', error.response?.data || error.message);
	  throw error;
	}
};
