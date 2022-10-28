import React from "react";
import Loading from "../components/Loading";
import { render } from "@testing-library/react";

describe("\nLoading component", () => {
  it("should render a loading component", () => {
    const { getByTestId, container } = render(
      <Loading type="cubes" color="#000000" data-testid="loading" />
    );
    expect(getByTestId("loading")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render a loading component with a different type", () => {
    const { getByTestId, rerender } = render(
      <Loading type="cubes" color="#000000" data-testid="loading" />
    );
    expect(getByTestId("loading")).toBeInTheDocument();

    rerender(
      <Loading
        type="spinningBubbles"
        color="#000000"
        data-testid="loading-new-type"
      />
    );
    expect(getByTestId("loading-new-type")).toBeInTheDocument();
  });

  it("should render a loading component with a different color", () => {
    const { getByTestId, rerender } = render(
      <Loading type="cubes" color="#ffffff" data-testid="loading" />
    );
    expect(getByTestId("loading")).toBeInTheDocument();
    expect(getByTestId("loading")).toHaveStyle("fill: #ffffff");

    rerender(<Loading type="cubes" color="#000000" data-testid="loading" />);
    expect(getByTestId("loading")).toBeInTheDocument();
    expect(getByTestId("loading")).toHaveStyle("fill: #000000");
  });
});
