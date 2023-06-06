import axios from 'axios';
import { BASE_URL } from './configApi';

export const listarDepoimentos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/depoimentos`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar depoimentos:', error);
        throw error;
    }
};

export const atualizarDepoimento = async (id, nome, depoimento) => {
    try {
        await axios.put(`${BASE_URL}/depoimento/editar/${id}`, { nome, depoimento });
    } catch (error) {
        console.error('Erro ao atualizar depoimento:', error);
        throw error;
    }
};

export const excluirDepoimento = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/depoimento/${id}`);
    } catch (error) {
        console.error('Erro ao excluir depoimento:', error);
        throw error;
    }
};
