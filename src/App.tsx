import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pricing from "./views/pricing/Pricing";
import Navbar from "./components/navbar/Navbar";
import LoadingProvider from "./providers/LoadingProvider";
import { Loading } from "./components/loading/Loading";

function App() {
  return (
    <>
      <LoadingProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Pricing />} />

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
          <Loading />
        </BrowserRouter>{" "}
      </LoadingProvider>
    </>
  );
}

export default App;
