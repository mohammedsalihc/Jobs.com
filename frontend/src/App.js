import React from "react";
import { Routes, Route, } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { UserContextProvider } from "./Components/context/userContext";
import Form from "./Components/Form";
import Jobs from "./Components/Jobs";





function App() {
  return (
    <div>

      <UserContextProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Form />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </UserContextProvider>



    </div>
  );
}

export default App;
