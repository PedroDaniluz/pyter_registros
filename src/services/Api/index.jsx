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

export const getCategorias = async () => {
    try {
        const response = await api.get("categorias/");
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/categorias", err);
        return [];
    }
};

export const getMateriais = async () => {
    try {
        const response = await api.get("materiais/");
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/materiais", err);
        return [];
    }
};

export const getVariacoes = async () => {
    try {
        const response = await api.get(`variacoes-detalhadas/`);
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/variacoes-detalhadas", err);
        return [];
    }
};


export default api;
