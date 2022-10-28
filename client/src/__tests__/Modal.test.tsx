import React from "react";
import { render } from "@testing-library/react";
import Modal from "../components/Modal";

describe("Modal Generic", () => {
  it("should render a modal", () => {
    const { getByTestId } = render(
      <Modal submitRef="submit-button" children="." />
    );
    expect(getByTestId("modal")).toBeInTheDocument();
  });

  it("should render a modal with a children", () => {
    const childrenModal = <div data-testid="children">children</div>;
    const { getByTestId } = render(
      <Modal submitRef="submit-button" children={childrenModal} />
    );
    expect(getByTestId("modal")).toBeInTheDocument();
    expect(getByTestId("children")).toBeInTheDocument();
  });

  it("should render a modal with trigger submit-button", () => {
    const { getByTestId, getByText } = render(
      <Modal submitRef="submit-button" children="." />
    );
    expect(getByTestId("modal")).toBeInTheDocument();
    expect(getByText("Sim, enviar")).toHaveAttribute("for", "submit-button");
  });
});
