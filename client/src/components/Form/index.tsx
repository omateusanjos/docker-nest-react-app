import React, { useCallback, useContext } from "react";

import { useForm } from "react-hook-form";
import {
  checkFileAndReturnJSON,
  MockColumns,
  parserToTable,
} from "../../utils/form";

import { SubmitButton } from "../SubmitButton";

import { createTransactions } from "../../services/form";
import { FileContext } from "../../pages";
import useToast from "../../hooks/useToast";

const FileUploader = ({
  register,
  handleFileChange,
}: {
  register: ReturnType<typeof useForm>["register"];
  handleFileChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type="file"
    {...register("arquivo")}
    onChange={handleFileChange}
    onChangeCapture={handleFileChange}
    onBlur={handleFileChange}
  />
);

export const Form = () => {
  const { ToastConfigs, ToastShow } = useToast();
  const { register, handleSubmit } = useForm();
  const { file, setContext } = useContext(FileContext);

  const handleFileChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (!evt.currentTarget.files?.[0]) return false;
      checkFileAndReturnJSON(evt)?.then((data) => {
        const { columns, data: parsedData } = parserToTable(data);
        const isColumnsValid =
          JSON.stringify(columns) === JSON.stringify(MockColumns);
        if (!isColumnsValid) {
          console.log("Colunas inválidas");
          ToastShow({
            type: "error",
            message: "O arquivo enviado não é válido",
          });
          return;
        }

        setContext({
          columns,
          data: parsedData,
        });
      }) ?? setContext([]);
    },
    [setContext, ToastShow]
  );
  const onSucess = () => {
    ToastShow({ message: "Transações criadas com sucesso", type: "success" });
    setContext({
      columns: [],
      data: [],
      loading: false,
    });
  };

  const onError = () => {
    ToastShow({ message: "Erro ao registrar transações", type: "error" });
    setContext({ ...file, loading: false });
  };

  const submit = async () => {
    setContext({ ...file, loading: true });
    const response = await createTransactions(file.data);
    if (response.status === 201) return onSucess();
    onError();
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <FileUploader register={register} handleFileChange={handleFileChange} />
        <SubmitButton hidden id="submit-button">
          Enviar
        </SubmitButton>

        <button
          id="cancel-button"
          type="button"
          onClick={() => setContext([])}
          hidden
        >
          Cancelar
        </button>
      </form>
      <ToastConfigs />
    </>
  );
};
