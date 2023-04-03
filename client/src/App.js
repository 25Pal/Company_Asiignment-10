import Header from "./Component/Header";
import Login from "./Component/Login";
import Home from "./Component/Home"
import Register from "./Component/Register";



import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <>
      <Header />
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>

    </>
  );
}

export default App;
