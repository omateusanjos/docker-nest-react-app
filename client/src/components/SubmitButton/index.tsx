import React from "react";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => (
  <button
    className="text-logo-btn p-2 rounded-lg my-4 font-bold"
    type="submit"
    {...props}
  >
    {children}
  </button>
);

export { SubmitButton };
