import React, { useState } from "react";
import { Route, Routes } from "react-router";
import UserContext, { UserDetails } from "./contexts/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Documents from "./pages/Documents";

function App() {
  const [user, setUser] = useState<UserDetails | null>(null);
  console.log(user);
  //i want to pass the user state down to the components with useContext
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </UserContext.Provider>
  );
}
export default App;
