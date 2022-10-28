import React, { createContext, useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "../components/Form";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { Table } from "../components/Table";

export const FileContext = createContext({
  file: {
    columns: [],
    data: [],
    loading: false,
  },
  setContext: (file: any) => {},
});

const IndexPage = () => {
  const [file, setContext] = useState({
    columns: [],
    data: [],
    loading: false,
  });

  const ComponentChildrenModal = () =>
    file.loading ? (
      <Loading type="cubes" color="#000000" />
    ) : (
      <Table {...file} />
    );

  return (
    <FileContext.Provider
      value={{
        file: file,
        setContext: setContext,
      }}
    >
      <Form />
      <br />
      <Link to="/list">
        <button>Lista</button>
      </Link>
      {file?.data?.length > 0 && (
        <Modal submitRef="submit-button" cancelRef="cancel-button">
          <ComponentChildrenModal />
        </Modal>
      )}
    </FileContext.Provider>
  );
};

export default IndexPage;
