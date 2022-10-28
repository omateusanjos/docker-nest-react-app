import React from "react";
import { renderHook, render } from "@testing-library/react";
import useToast from "../hooks/useToast";

describe("useToast", () => {
  it("should call a ToastConfigs, return Toastify in dom?", () => {
    const { result } = renderHook(() => useToast(), {
      baseElement: document.body,
    });
    const { ToastConfigs } = result.current;

    const wrapper = render(
      <div>
        <ToastConfigs />
      </div>
    );

    expect(wrapper.container.getElementsByClassName("Toastify").length).toBe(1);
  });
});
