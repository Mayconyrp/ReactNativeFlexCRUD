import axios from 'axios';
import { BASE_URL } from './configApi'; // Importe a BASE_URL do arquivo config.js

export const cadastrarDepoimento = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/depoimento`, formData);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        throw error;
    }
};
