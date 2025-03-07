import axios from "axios";

const api = axios.create({
    baseURL: "http://54.211.52.179:8000"
});

// Função para pegar as instituições
export const getInstituicoes = async () => {
    try {
        const response = await api.get("/instituicoes/");
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/instituicoes", err);
        return [];
    }
};

// Função para pegar as produtos
export const getProdutos = async () => {
    try {
        const response = await api.get("/produtos/");
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/produtos", err);
        return [];
    }
};

export default api;
