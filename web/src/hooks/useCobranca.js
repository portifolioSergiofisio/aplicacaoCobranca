import {useMutation, useQuery, useQueryClient} from 'react-query';
import axios from '../servicos/api';
import {localConfig} from '../utilidades/localStorage';
import {servicosApi} from '../servicos/api.servicos';
import { feedSucesso } from '../utilidades/funcoes';

const config = {
    headers: {Authorization: `Bearer ${localConfig.pegarToken()}`},
};

export function useCobrancas() {
    return useQuery('cobranca', servicosApi.pegarCobrancas, {
        staleTime: 2 * 60 * 1000, // 2 minutos
        retry: 3,
        retryDelay: 1500,
    });
}

export function useCobrancasCliente(id) {
    return useQuery(['cobranca', id], () => servicosApi.pegarCobrancasCliente(id));
}

export function useCobrancaPorId(id) {
    return useQuery(['cobranca', id], () => servicosApi.pegarCobrancaPorId(id));
}

export function useCadastrarCobranca() {
    const queryClient = useQueryClient();
    const {refetch} = useCobrancas();

    const cadastrarCobranca = async (cobranca) => {
        const response = await axios.post('/cobranca', cobranca, config);
        feedSucesso('Cobrança cadastrada com sucesso');
        return response.data;
    };

    const {mutateAsync, isLoading, isError, error} = useMutation(cadastrarCobranca, {
        onSuccess: () => {
            queryClient.invalidateQueries('cobranca');
            queryClient.invalidateQueries('cliente');
            refetch();
        },
    });

    return {cadastrarCobranca: mutateAsync, isLoading, isError, error};
}

export function useAtualizarCobranca() {
    const queryClient = useQueryClient();

    const atualizarCobranca = async (cobranca) => {
        const {id, ...cobrancaAtualizada} = cobranca;
        const response = await axios.put(`/cobranca/${id}`, cobrancaAtualizada, config);
        feedSucesso('Cobrança alterada com sucesso');
        return response.data;
    };

    const {mutateAsync, isLoading, isError, error} = useMutation(atualizarCobranca, {
        onSuccess: () => {
            queryClient.invalidateQueries('cobranca');
            queryClient.invalidateQueries('cliente');
        },
    });

    return {atualizarCobranca: mutateAsync, isLoading, isError, error};
}

export function useDeletarCobranca() {
    const queryClient = useQueryClient();

    const deletarCobranca = async (id) => {
        await axios.delete(`/cobranca/${id}`, config);
    };

    const {mutateAsync, isLoading, isError, error} = useMutation(deletarCobranca, {
        onSuccess: () => {
            queryClient.invalidateQueries('cobranca');
        },
    });

    return {deletarCobranca: mutateAsync, isLoading, isError, error};
}
