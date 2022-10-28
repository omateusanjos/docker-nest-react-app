import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastConfigs = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

const useToast = () => {
  const ToastShow = ({ message, type }: { message: string; type: string }) => {
    const toastType = type === "success" ? toast.success : toast.error;
    toastType(message);
  };

  return { ToastShow, ToastConfigs };
};

export default useToast;
