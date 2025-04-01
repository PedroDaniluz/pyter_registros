import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/"
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


export const getPedidoInfo = async (id) => {
    try {
        const response = await api.get(`pedido-info/${id}/`);
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/pedido-info", err);
        return [];
    }
};


export const getPedidoItens = async (id) => {
    try {
        const response = await api.get(`pedido-itens/${id}/`);
        return response.data;
    } catch (err) {
        console.error("ERRO DE API => root/pedido-itens", err);
        return [];
    }
};


export default api;
