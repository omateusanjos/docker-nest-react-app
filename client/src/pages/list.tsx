import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import APIHubla from '../../api';
import { Table } from '../components/Table';
import useToast from '../hooks/useToast';
import { FileUploadedFile } from '../types/form';
import { MockColumns } from '../utils/form';

const ContainerList = ({ list }: { list: FileUploadedFile[] }) => (
  <div
    style={{
      maxHeight: '40rem',
      overflowY: 'auto',
    }}
  >
    <Table data={list} columns={MockColumns} />
  </div>
);

const toUpperCase = (value: string) => value.toUpperCase();

const List = () => {
  const [fetching, setFetching] = React.useState(false);
  const [value, setValue] = React.useState<string>('');
  const { ToastShow, ToastConfigs } = useToast();

  const {
    data: ResponseListTransactions,
    isInitialLoading,
    isFetching,
  } = useQuery<AxiosResponse<FileUploadedFile[]>>(
    ['list', toUpperCase(value)],
    () => APIHubla.get(`/transactions/${toUpperCase(value)}`),
    {
      enabled: fetching,
      staleTime: 1000 * 60 * 60,
      onSuccess: () => {
        setFetching(false);
        ToastShow({
          type: 'success',
          message: 'Transações carregadas com sucesso',
        });
      },
      onError: () => {
        setFetching(false);
        ToastShow({
          type: 'error',
          message: 'Erro ao carregar transações',
        });
      },
      notifyOnChangeProps: ['data'],
    },
  );

  const handleFind = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const ListIsNotNull = ResponseListTransactions?.data?.length;
  const Container = ListIsNotNull ? (
    <ContainerList list={ResponseListTransactions?.data} />
  ) : (
    <div>Nenhuma transação encontrada. Procure novamente</div>
  );

  return (
    <div>
      <Link to="/">Back Home</Link>
      <br /> <br />
      <input type="text" value={value} onChange={handleFind} />
      <button onClick={() => setFetching(true)}>Buscar</button> <br /> <br />
      {isInitialLoading && <p>Carregando...</p>}
      {isFetching && <p>Atualizando...</p>}
      <ToastConfigs />
      {Container}
    </div>
  );
};

export default List;
