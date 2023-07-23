import "@/styles/globals.css";
import "../components/components.css";
import { Toaster } from "react-hot-toast";
import { StateContext } from "../context/StateContext";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster />
      <Component {...pageProps} />
    </StateContext>
  );
}
