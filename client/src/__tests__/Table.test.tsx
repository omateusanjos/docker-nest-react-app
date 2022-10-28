import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { Table } from "../components/Table";

const mockData = [
  {
    name: "John Doe",
    email: "teste@gmail.com",
    phone: "123456789",
  },
];

const mockColumns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },

  {
    Header: "Phone",
    accessor: "phone",
  },
];

describe("Table component", () => {
  let wrapper: RenderResult | null;

  beforeEach(() => {
    jest.resetModules();
    wrapper = render(<Table data={mockData} columns={mockColumns} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper = null;
  });

  it("should render a table", () => {
    expect(wrapper?.getByRole("table")).toBeInTheDocument();
  });

  it("should render a table with the correct number of rows", () => {
    expect(wrapper?.getAllByRole("row")).toHaveLength(2);
  });

  it("should render a table with the correct number of columns", () => {
    expect(wrapper?.getAllByRole("columnheader")).toHaveLength(3);
  });

  it("should render a table with the correct number of cells", () => {
    expect(wrapper?.getAllByRole("cell")).toHaveLength(3);
  });

  it("should render a table with the correct text", () => {
    expect(wrapper?.getByText("John Doe")).toBeInTheDocument();
    expect(wrapper?.getByText("teste@gmail.com")).toBeInTheDocument();
    expect(wrapper?.getByText("123456789")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    expect(wrapper?.container).toMatchSnapshot();
  });
});
