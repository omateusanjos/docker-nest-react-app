import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { SubmitButton } from "../components/SubmitButton/index";
import "@testing-library/jest-dom";

describe("\nSubmitButton component", () => {
  let wrapper: RenderResult | null;

  beforeEach(() => {
    wrapper = render(<SubmitButton>Submit</SubmitButton>);
    expect(wrapper).not.toBeNull();
  });

  afterEach(() => {
    wrapper = null;
  });

  it("should render a button", () => {
    expect(
      wrapper?.getByRole("button", {
        name: "Submit",
      })
    ).toBeInTheDocument();
  });

  it("should render a button and rerender but no text", () => {
    expect(wrapper?.getByRole("button")).toBeInTheDocument();
    wrapper?.rerender(<SubmitButton children={undefined} />);
    expect(wrapper?.getByRole("button")).toHaveTextContent("");
  });

  it("button native property assignment: disabled", () => {
    expect(wrapper?.getByRole("button")).not.toBeDisabled();
    wrapper?.rerender(<SubmitButton disabled children={undefined} />);
    expect(wrapper?.getByRole("button")).toHaveAttribute("disabled");
  });

  it("should match snapshot", () => {
    expect(wrapper?.container).toMatchSnapshot();
  });
});
