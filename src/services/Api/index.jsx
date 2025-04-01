import axios from "axios";

const api = axios.create({
    baseURL: "http://54.211.52.179:8000/"
});

export const getInstituicoes = async () => {
    try {
        const response = await api.get("instituicoes/");
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/instituicoes", err);
        return [];
    }
};

export const getProdutos = async () => {
    try {
        const response = await api.get("produtos/");
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/produtos", err);
        return [];
    }
};

export const getVariacoes = async () => {
    try {
        const response = await api.get('lista-variacoes/');
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/lista-variacoes", err);
        return [];
    }
};


export const getPedidos = async () => {
    try {
        const response = await api.get('lista-pedidos/');
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/lista-pedidos", err);
        return [];
    }
};


export default api;
