import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ShellComponent } from "./Shell";
import { ToastContainer } from "react-toastify";

export const Title = styled.h1.attrs({
  className: "text-3xl font-bold underline",
})``;

function App() {
  return (
    <>
      <ShellComponent />
      <ToastContainer
        position="top-center"
        theme={"colored"}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
